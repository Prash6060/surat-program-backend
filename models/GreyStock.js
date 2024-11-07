// models/greystock.js

const mongoose = require('mongoose');

const greyStockSchema = new mongoose.Schema({
  grey_purchase_quality: {
    type: String,
    required: true,
  },
  grey_purchase_total_roll: {
    type: Number,
    required: true,
  },
  grey_purchase_billno: {
    type: String,
    required: true,
    unique: true, // Ensures no duplicate bill numbers
  },
  grey_purchase_challan: {
    type: String,
    required: true,
  },
  grey_purchase_date: {
    type: Date,
    required: true,
  },
  grey_purchase_from: {
    type: String,
    required: true,
  },
  grey_sent_to: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "DYING", // Default value set to "DYING"
  }
}, {
  timestamps: true, // Automatically add createdAt and updatedAt fields
});

// Create the model
const GreyStock = mongoose.model('GreyStock', greyStockSchema);

module.exports = GreyStock;
