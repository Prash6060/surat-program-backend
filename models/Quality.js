const mongoose = require('mongoose');

// Define the schema for the Quality model
const qualitySchema = new mongoose.Schema(
  {
    quality_name: {
      type: String,
      required: true,
      unique: true, // Ensures that quality names are unique
      trim: true, // Trims any extra spaces around the name
    },
  }
);

// Create the Quality model using the schema
const Quality = mongoose.model('Quality', qualitySchema);

module.exports = Quality;
