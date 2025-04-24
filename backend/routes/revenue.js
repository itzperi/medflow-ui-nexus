const express = require('express');
const router = express.Router();
const {
  getAllRevenue,
  createRevenue
} = require('../controllers/revenueController');

router
  .route('/')
  .get(getAllRevenue)
  .post(createRevenue);

module.exports = router;
