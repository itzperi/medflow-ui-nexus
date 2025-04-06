
const express = require('express');
const router = express.Router();
const {
  getAllPatients,
  getPatient,
  createPatient,
  updatePatient,
  deletePatient,
  uploadMedicalReport
} = require('../controllers/patientController');

router
  .route('/')
  .get(getAllPatients)
  .post(createPatient);

router
  .route('/:id')
  .get(getPatient)
  .put(updatePatient)
  .delete(deletePatient);

router
  .route('/:id/upload')
  .post(uploadMedicalReport);

module.exports = router;
