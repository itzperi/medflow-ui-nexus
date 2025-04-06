
const mongoose = require('mongoose');

const SymptomCheckSchema = new mongoose.Schema({
  symptoms: [{
    type: String,
    required: true
  }],
  possibleConditions: [{
    name: String,
    probability: Number,
    severity: String,
    description: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('SymptomCheck', SymptomCheckSchema);
