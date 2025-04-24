const Revenue = require('../models/Revenue');

// Get all revenue entries
exports.getAllRevenue = async (req, res) => {
  try {
    let query = {};
    
    // Add department filter if it exists
    if (req.query.department) {
      query.department = req.query.department;
    }
    
    // Add payment method filter if it exists
    if (req.query.paymentMethod) {
      query.paymentMethod = req.query.paymentMethod;
    }
    
    // Add date range filter if it exists
    if (req.query.startDate && req.query.endDate) {
      query.date = {
        $gte: new Date(req.query.startDate),
        $lte: new Date(req.query.endDate)
      };
    }
    
    const revenue = await Revenue.find(query);
    
    // Calculate total revenue
    const totalRevenue = revenue.reduce((acc, curr) => acc + curr.amount, 0);
    
    // Group by department for chart data
    const departmentData = {};
    revenue.forEach(entry => {
      if (!departmentData[entry.department]) {
        departmentData[entry.department] = 0;
      }
      departmentData[entry.department] += entry.amount;
    });
    
    // Group by month for chart data
    const monthlyData = {};
    revenue.forEach(entry => {
      const month = entry.date.toLocaleString('default', { month: 'long' });
      if (!monthlyData[month]) {
        monthlyData[month] = 0;
      }
      monthlyData[month] += entry.amount;
    });
    
    res.status(200).json({
      success: true,
      count: revenue.length,
      totalRevenue,
      departmentData: Object.entries(departmentData).map(([name, value]) => ({ name, value })),
      monthlyData: Object.entries(monthlyData).map(([name, value]) => ({ name, value })),
      data: revenue
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// Create new revenue entry
exports.createRevenue = async (req, res) => {
  try {
    const revenue = await Revenue.create(req.body);
    
    res.status(201).json({
      success: true,
      data: revenue
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
