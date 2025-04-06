
const Patient = require('../models/Patient');

// Get all patients
exports.getAllPatients = async (req, res) => {
  try {
    let query = {};
    
    // Add search filters if they exist
    if (req.query.search) {
      query = {
        $or: [
          { name: { $regex: req.query.search, $options: 'i' } },
          { department: { $regex: req.query.search, $options: 'i' } }
        ]
      };
    }
    
    // Add department filter if it exists
    if (req.query.department) {
      query.department = req.query.department;
    }
    
    const patients = await Patient.find(query);
    
    // Simulate real-time vitals with slight variations
    const patientsWithUpdatedVitals = patients.map(patient => {
      const doc = patient.toObject();
      doc.heartRate = Math.floor(doc.heartRate + (Math.random() * 5 - 2.5));
      
      const systolic = parseInt(doc.bloodPressure.split('/')[0]);
      const diastolic = parseInt(doc.bloodPressure.split('/')[1]);
      doc.bloodPressure = `${Math.floor(systolic + (Math.random() * 5 - 2.5))}/${Math.floor(diastolic + (Math.random() * 5 - 2.5))}`;
      
      doc.oxygenLevel = Math.min(100, Math.max(90, Math.floor(doc.oxygenLevel + (Math.random() * 2 - 1))));
      
      return doc;
    });
    
    res.status(200).json({
      success: true,
      count: patientsWithUpdatedVitals.length,
      data: patientsWithUpdatedVitals
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// Get single patient
exports.getPatient = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    
    if (!patient) {
      return res.status(404).json({
        success: false,
        error: 'Patient not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: patient
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// Create new patient
exports.createPatient = async (req, res) => {
  try {
    const patient = await Patient.create(req.body);
    
    res.status(201).json({
      success: true,
      data: patient
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      
      return res.status(400).json({
        success: false,
        error: messages
      });
    } else {
      res.status(500).json({
        success: false,
        error: 'Server Error'
      });
    }
  }
};

// Update patient
exports.updatePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    if (!patient) {
      return res.status(404).json({
        success: false,
        error: 'Patient not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: patient
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// Delete patient
exports.deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    
    if (!patient) {
      return res.status(404).json({
        success: false,
        error: 'Patient not found'
      });
    }
    
    await patient.deleteOne();
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// Upload medical report
exports.uploadMedicalReport = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    
    if (!patient) {
      return res.status(404).json({
        success: false,
        error: 'Patient not found'
      });
    }
    
    // In a real app, you would handle file uploads here
    // For now, we'll just add the report info
    patient.medicalReports.push({
      name: req.body.name,
      fileType: req.body.fileType
    });
    
    await patient.save();
    
    res.status(200).json({
      success: true,
      data: patient
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};
