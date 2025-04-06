
const mongoose = require('mongoose');

const RevenueSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: [true, 'Amount is required']
  },
  department: {
    type: String,
    required: [true, 'Department is required']
  },
  date: {
    type: Date,
    default: Date.now
  },
  paymentMethod: {
    type: String,
    required: [true, 'Payment method is required'],
    enum: ['Cash', 'Credit Card', 'Insurance', 'Bank Transfer', 'Other']
  }
});

module.exports = mongoose.model('Revenue', RevenueSchema);
