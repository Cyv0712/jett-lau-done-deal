const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Bike = require('../models/Bike');

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + Math.round(Math.random() * 1e6) + path.extname(file.originalname));
  }
});

// Accept up to 10 images per bike under the field name "images"
const upload = multer({ storage });

// Get all bikes
router.get('/', async (req, res) => {
  try {
    const bikes = await Bike.find().sort({ createdAt: -1 });
    res.json(bikes);
  } catch (err) {
    res.status(500).json({ message: err.message });
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

// Create a bike — accepts multiple images
router.post('/', upload.array('images', 10), async (req, res) => {
  const bikeData = { ...req.body };

  if (req.files && req.files.length > 0) {
    bikeData.images = req.files.map((file) => `/uploads/${file.filename}`);
  }

  const bike = new Bike(bikeData);
  try {
    const newBike = await bike.save();
    res.status(201).json(newBike);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a bike — accepts multiple images
router.put('/:id', upload.array('images', 10), async (req, res) => {
  const bikeData = { ...req.body };

  if (req.files && req.files.length > 0) {
    bikeData.images = req.files.map((file) => `/uploads/${file.filename}`);
  }

  try {
    const updatedBike = await Bike.findByIdAndUpdate(req.params.id, bikeData, { new: true });
    if (!updatedBike) return res.status(404).json({ message: 'Bike not found' });
    res.json(updatedBike);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Mark a bike as sold
router.patch('/:id/sold', async (req, res) => {
  try {
    const updatedBike = await Bike.findByIdAndUpdate(
      req.params.id,
      { status: 'Sold' },
      { new: true }
    );
    if (!updatedBike) return res.status(404).json({ message: 'Bike not found' });
    res.json(updatedBike);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a bike — removes ALL associated image files from disk
router.delete('/:id', async (req, res) => {
  try {
    const bike = await Bike.findById(req.params.id);
    if (!bike) return res.status(404).json({ message: 'Bike not found' });

    // Delete all uploaded image files
    if (Array.isArray(bike.images)) {
      bike.images.forEach((imagePath) => {
        if (imagePath && imagePath.startsWith('/uploads')) {
          const fullPath = path.join(__dirname, '..', imagePath);
          if (fs.existsSync(fullPath)) {
            fs.unlinkSync(fullPath);
          }
        }
      });
    }

    await Bike.findByIdAndDelete(req.params.id);
    res.json({ message: 'Bike and all associated images deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
