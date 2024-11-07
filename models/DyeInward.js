const mongoose = require('mongoose');

// Define the Grey Quality Schema
const greyQualitySchema = new mongoose.Schema({
    grey_quality: {
        type: String,
        required: true,
    },
    grey_challan: {
        type: String,
        required: true,
    },
    grey_lotno: {
        type: String,
        required: true,
    },
    grey_roll: {
        type: Number,
        required: true,
    },
    grey_grey_mtr: {
        type: Number,
        required: true,
    },
    grey_fns_mtr: {
        type: Number,
        required: true,
    },
    grey_rate_per_mtr: {
        type: Number,
        required: true,
    },
    grey_amt: {
        type: Number,
        required: true,
    },
});

// Define the Dye Inward Schema
const dyeInwardSchema = new mongoose.Schema({
    dye_from: {
        type: String,
        required: true,
    },
    grey_details: [greyQualitySchema], // Array of grey quality details
}, {
    timestamps: true, // Automatically add createdAt and updatedAt fields
});

// Create the Dye Inward model
const DyeInward = mongoose.model('DyeInward', dyeInwardSchema);

module.exports = DyeInward;
