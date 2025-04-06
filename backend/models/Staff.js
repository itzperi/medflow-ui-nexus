
const mongoose = require('mongoose');

const StaffSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Staff name is required'],
    trim: true
  },
  role: {
    type: String,
    required: [true, 'Staff role is required'],
    enum: ['Doctor', 'Nurse', 'Lab Technician', 'Receptionist', 'Administrator']
  },
  department: {
    type: String,
    required: [true, 'Department is required']
  },
  shift: {
    type: String,
    required: [true, 'Shift is required'],
    enum: ['Morning', 'Evening', 'Night']
  },
  performanceScore: {
    type: Number,
    default: 80,
    min: 0,
    max: 100
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Staff', StaffSchema);
