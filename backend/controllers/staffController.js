const Staff = require('../models/Staff');

// Get all staff members
exports.getAllStaff = async (req, res) => {
  try {
    let query = {};
    
    // Add search filters if they exist
    if (req.query.search) {
      query = {
        $or: [
          { name: { $regex: req.query.search, $options: 'i' } },
          { role: { $regex: req.query.search, $options: 'i' } },
          { department: { $regex: req.query.search, $options: 'i' } }
        ]
      };
    }
    
    // Add role filter if it exists
    if (req.query.role) {
      query.role = req.query.role;
    }
    
    // Add department filter if it exists
    if (req.query.department) {
      query.department = req.query.department;
    }
    
    const staff = await Staff.find(query);
    
    res.status(200).json({
      success: true,
      count: staff.length,
      data: staff
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// Get single staff member
exports.getStaffMember = async (req, res) => {
  try {
    const staffMember = await Staff.findById(req.params.id);
    
    if (!staffMember) {
      return res.status(404).json({
        success: false,
        error: 'Staff member not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: staffMember
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// Create new staff member
exports.createStaffMember = async (req, res) => {
  try {
    const staffMember = await Staff.create(req.body);
    
    res.status(201).json({
      success: true,
      data: staffMember
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

// Update staff member
exports.updateStaffMember = async (req, res) => {
  try {
    const staffMember = await Staff.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    if (!staffMember) {
      return res.status(404).json({
        success: false,
        error: 'Staff member not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: staffMember
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// Delete staff member
exports.deleteStaffMember = async (req, res) => {
  try {
    const staffMember = await Staff.findById(req.params.id);
    
    if (!staffMember) {
      return res.status(404).json({
        success: false,
        error: 'Staff member not found'
      });
    }
    
    await staffMember.deleteOne();
    
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
