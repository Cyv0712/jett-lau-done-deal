const express = require('express');
const router = express.Router();
const multer = require('multer');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const Bike = require('../models/Bike');
const { persistUploadedImages, deleteBikeImages, optimizeImageBuffer } = require('../utils/imageStorage');
const { downloadImage } = require('../utils/download');
const authMiddleware = require('../middleware/auth');

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
});

// Get all bikes
router.get('/', async (req, res) => {
  try {
    const bikes = await Bike.find().sort({ createdAt: -1 });
    res.json(bikes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Image Proxy endpoint — caches and optimizes Cloudinary images locally
router.get('/image-proxy', async (req, res) => {
  const imageUrl = req.query.url;
  if (!imageUrl) {
    return res.status(400).json({ message: 'URL query parameter is required' });
  }

  try {
    const md5Hash = crypto.createHash('md5').update(imageUrl).digest('hex');
    const cacheDir = path.join(__dirname, '..', 'cache');
    if (!fs.existsSync(cacheDir)) {
      fs.mkdirSync(cacheDir, { recursive: true });
    }
    const cachedFilePath = path.join(cacheDir, `${md5Hash}.webp`);

    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');

    if (fs.existsSync(cachedFilePath)) {
      return res.sendFile(cachedFilePath);
    }

    const buffer = await downloadImage(imageUrl);
    const optimizedBuffer = await optimizeImageBuffer(buffer);
    fs.writeFileSync(cachedFilePath, optimizedBuffer);

    res.setHeader('Content-Type', 'image/webp');
    return res.send(optimizedBuffer);
  } catch (err) {
    console.error('Image proxy failed, redirecting to fallback:', err.message);
    return res.redirect(imageUrl);
  }
});

// Get a single bike
router.get('/:id', async (req, res) => {
  try {
    const bike = await Bike.findById(req.params.id);
    if (!bike) return res.status(404).json({ message: 'Bike not found' });
    res.json(bike);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Simple in-memory cache to prevent duplicate submissions from retries
const recentSubmissions = new Map();

// Create a bike — accepts multiple images
router.post('/', authMiddleware, upload.array('images', 10), async (req, res) => {
  try {
    const bikeData = { ...req.body };
    
    // Create a unique fingerprint for this submission
    const fingerprint = `${bikeData.brand}-${bikeData.model}-${bikeData.price}-${bikeData.mileage}`;
    const now = Date.now();
    
    if (recentSubmissions.has(fingerprint)) {
      const lastTime = recentSubmissions.get(fingerprint);
      if (now - lastTime < 30000) { // 30 second window
        console.log('Duplicate submission detected, ignoring retry:', fingerprint);
        return res.status(200).json({ message: 'Duplicate submission ignored' });
      }
    }
    
    recentSubmissions.set(fingerprint, now);

    const bikeName = `${bikeData.brand} ${bikeData.model} ${bikeData.engineSize || ''}`.trim();

    // 1. Save document first with empty images to trigger validation
    const bike = new Bike({ ...bikeData, images: [] });
    await bike.save();

    // 2. Only proceed to upload images if database validation succeeds
    if (req.files?.length) {
      try {
        const uploadedImages = await persistUploadedImages(req.files, bikeName);
        bike.images = uploadedImages;
        await bike.save();
      } catch (uploadErr) {
        await Bike.findByIdAndDelete(bike._id); // rollback
        throw uploadErr;
      }
    }

    res.status(201).json(bike);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a bike — accepts multiple images
router.put('/:id', authMiddleware, upload.array('images', 10), async (req, res) => {
  try {
    const existing = await Bike.findById(req.params.id);
    if (!existing) return res.status(404).json({ message: 'Bike not found' });

    const bikeData = { ...req.body };
    const originalImages = existing.images || [];
    const bikeName = `${bikeData.brand || existing.brand} ${bikeData.model || existing.model} ${bikeData.engineSize || existing.engineSize || ''}`.trim();

    // 1. Update specs and validate first, keeping original images
    existing.set({ ...bikeData, images: originalImages });
    await existing.save();

    // 2. Handle image replacements
    if (req.files?.length) {
      try {
        const uploadedImages = await persistUploadedImages(req.files, bikeName);
        existing.images = uploadedImages;
        await existing.save();
        await deleteBikeImages(originalImages); // safely delete old images AFTER new save
      } catch (uploadErr) {
        throw uploadErr;
      }
    } else if (req.body.existingImages) {
      const imagesArray = Array.isArray(req.body.existingImages) ? req.body.existingImages : [req.body.existingImages];
      existing.images = imagesArray;
      await existing.save();
    }

    res.json(existing);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Mark a bike as sold — clears spec details and deletes associated images from disk / Cloudinary
router.patch('/:id/sold', authMiddleware, async (req, res) => {
  try {
    const bike = await Bike.findById(req.params.id);
    if (!bike) return res.status(404).json({ message: 'Bike not found' });

    // Delete associated images from disk / Cloudinary to keep it lightweight
    if (bike.images && bike.images.length > 0) {
      await deleteBikeImages(bike.images);
    }

    const updatedBike = await Bike.findByIdAndUpdate(
      req.params.id,
      {
        $set: { status: 'Sold' },
        $unset: {
          edition: 1,
          type: 1,
          year: 1,
          mileage: 1,
          description: 1,
          issues: 1,
          engineSize: 1,
          engineConfig: 1,
          power: 1,
          transmission: 1,
          fuelCapacity: 1,
          images: 1
        }
      },
      { new: true }
    );
    res.json(updatedBike);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a bike — removes associated disk files and Cloudinary assets
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const bike = await Bike.findById(req.params.id);
    if (!bike) return res.status(404).json({ message: 'Bike not found' });

    await deleteBikeImages(bike.images);

    await Bike.findByIdAndDelete(req.params.id);
    res.json({ message: 'Bike and all associated images deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
