const mongoose = require('mongoose');

// Define the schema for the stock_array items
const stockItemSchema = new mongoose.Schema({
    grey_quality: {
        type: String,
        required: true,
    },
    total_roll: {
        type: Number,
        required: true,
    },
    total_fns_mtr: {
        type: Number,
        required: true,
    },
    total_amt: {
        type: Number,
        required: true,
    }
}, { _id: false }); // Prevent automatic creation of _id for each array item

// Define the TejasStock schema
const tejasStockSchema = new mongoose.Schema({
    received_from: {
        type: String,
        required: true,
    },
    date_of_receive: {
        type: Date,
        required: true,
    },
    challan: {
        type: String,
        required: true, // Add challan field
    },
    stock_array: [stockItemSchema] // Array of stockItemSchema
}, {
    timestamps: true // Automatically add createdAt and updatedAt fields
});

// Create the model
const TejasStock = mongoose.model('TejasStock', tejasStockSchema);

module.exports = TejasStock;
