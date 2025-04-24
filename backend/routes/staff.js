const express = require('express');
const router = express.Router();
const {
  getAllStaff,
  getStaffMember,
  createStaffMember,
  updateStaffMember,
  deleteStaffMember
} = require('../controllers/staffController');

router
  .route('/')
  .get(getAllStaff)
  .post(createStaffMember);

router
  .route('/:id')
  .get(getStaffMember)
  .put(updateStaffMember)
  .delete(deleteStaffMember);

module.exports = router;
