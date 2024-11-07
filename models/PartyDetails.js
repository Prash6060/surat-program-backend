const mongoose = require('mongoose');

// Define the PartyDetails schema
const partyDetailsSchema = new mongoose.Schema({
  partyType: {
    type: String,
    enum: ['grey-party', 'dye-party'], // Enum for allowed values
    required: true,
  },
  partyName: {
    type: String,
    required: true,
    trim: true, // Trims whitespace from both ends
  },
  gstin: {
    type: String,
    required: true,
    unique: true, // Ensures GSTIN is unique
    trim: true, // Trims whitespace
  },
  address: {
    type: String,
    required: true,
    trim: true, // Trims whitespace
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

// Create the PartyDetails model
const PartyDetails = mongoose.model('PartyDetails', partyDetailsSchema);

module.exports = PartyDetails;
