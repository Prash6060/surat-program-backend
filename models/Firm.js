const mongoose = require('mongoose');

// Define the firm schema
const firmSchema = new mongoose.Schema({
  firmName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
}, { timestamps: true });

// Create and export the firm model
const Firm = mongoose.model('Firm', firmSchema);
module.exports = Firm;
