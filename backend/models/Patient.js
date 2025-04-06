
const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Patient name is required'],
    trim: true
  },
  age: {
    type: Number,
    required: [true, 'Patient age is required']
  },
  gender: {
    type: String,
    required: [true, 'Patient gender is required'],
    enum: ['Male', 'Female', 'Other']
  },
  department: {
    type: String,
    required: [true, 'Department is required']
  },
  heartRate: {
    type: Number,
    default: 75
  },
  bloodPressure: {
    type: String,
    default: "120/80"
  },
  oxygenLevel: {
    type: Number,
    default: 98
  },
  medicalReports: [{
    name: String,
    fileType: String,
    uploadDate: {
      type: Date,
      default: Date.now
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Patient', PatientSchema);
