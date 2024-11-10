const mongoose = require('mongoose');

const greyPurchaseSchema = new mongoose.Schema({
  grey_purchase_from: {
    type: String,
    required: true,
  },
  grey_date_of_purchase: {
    type: Date,
    required: true,
  },
  grey_challan_no: {
    type: String,
    required: true,
  },
  grey_bill_no: {
    type: String,
    required: true,
  },
  grey_party_name: {
    type: String,
    required: true,
  },
  grey_purchase_quality: {
    type: String,
    required: true,
  },
  grey_total_roll: {
    type: Number,
    required: true,
  },
  grey_total_net_wtg: {
    type: Number,
    required: true,
  },
  grey_total_bill_amt: {
    type: Number,
    required: true,
  },
  grey_sent_to: {
    type: String,
    required: true,
  },
  canBeModified: { // New attribute added
    type: Boolean,
    default: true, // Default value is true
  }
}, { timestamps: true }); // Automatically add createdAt and updatedAt fields

const GreyPurchase = mongoose.model('GreyPurchase', greyPurchaseSchema);

module.exports = GreyPurchase;
