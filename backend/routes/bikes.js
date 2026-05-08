const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Bike = require('../models/Bike');

// Configure multer for image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

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

// Create a bike
router.post('/', upload.single('image'), async (req, res) => {
  const bikeData = { ...req.body };
  if (req.file) {
    bikeData.image = `/uploads/${req.file.filename}`;
  }

  const bike = new Bike(bikeData);
  try {
    const newBike = await bike.save();
    res.status(201).json(newBike);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a bike
router.put('/:id', upload.single('image'), async (req, res) => {
  const bikeData = { ...req.body };
  if (req.file) {
    bikeData.image = `/uploads/${req.file.filename}`;
  }

  try {
    const updatedBike = await Bike.findByIdAndUpdate(req.params.id, bikeData, { new: true });
    if (!updatedBike) return res.status(404).json({ message: 'Bike not found' });
    res.json(updatedBike);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a bike
router.delete('/:id', async (req, res) => {
  try {
    const bike = await Bike.findByIdAndDelete(req.params.id);
    if (!bike) return res.status(404).json({ message: 'Bike not found' });
    res.json({ message: 'Bike deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
