const mongoose = require('mongoose');

const BikeSchema = new mongoose.Schema({
  brand: { type: String, required: true },
  model: { type: String, required: true },
  type: { type: String, required: true },
  year: { type: Number, required: true },
  mileage: { type: String, required: true },
  price: { type: String, required: true },
  description: { type: String },
  issues: { type: String },
  engineSize: { type: String },
  engineConfig: { type: String },
  power: { type: String },
  transmission: { type: String },
  fuelCapacity: { type: String },
  image: { type: String } // URL or file path
}, { timestamps: true });

module.exports = mongoose.model('Bike', BikeSchema);
