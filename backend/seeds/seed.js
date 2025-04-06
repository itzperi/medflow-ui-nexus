
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Patient = require('../models/Patient');
const Staff = require('../models/Staff');
const Revenue = require('../models/Revenue');

// Load env vars
dotenv.config();

// Connect to DB
mongoose.connect(process.env.MONGO_URI);

// Patient seed data
const patientData = [
  {
    name: "John Doe",
    age: 45,
    gender: "Male",
    department: "Cardiology",
    heartRate: 72,
    bloodPressure: "120/80",
    oxygenLevel: 98,
  },
  {
    name: "Jane Smith",
    age: 32,
    gender: "Female",
    department: "Neurology",
    heartRate: 68,
    bloodPressure: "118/75",
    oxygenLevel: 99,
  },
  {
    name: "Mike Johnson",
    age: 51,
    gender: "Male",
    department: "Orthopedics",
    heartRate: 76,
    bloodPressure: "135/85",
    oxygenLevel: 97,
  },
  {
    name: "Sarah Williams",
    age: 28,
    gender: "Female",
    department: "Oncology",
    heartRate: 70,
    bloodPressure: "110/70",
    oxygenLevel: 98,
  },
  {
    name: "Robert Brown",
    age: 63,
    gender: "Male",
    department: "Cardiology",
    heartRate: 82,
    bloodPressure: "145/90",
    oxygenLevel: 95,
  },
  {
    name: "Emily Davis",
    age: 37,
    gender: "Female",
    department: "Pediatrics",
    heartRate: 65,
    bloodPressure: "115/75",
    oxygenLevel: 99,
  }
];

// Staff seed data
const staffData = [
  {
    name: "Dr. James Wilson",
    role: "Doctor",
    department: "Cardiology",
    shift: "Morning",
    performanceScore: 92,
  },
  {
    name: "Dr. Sarah Palmer",
    role: "Doctor",
    department: "Neurology",
    shift: "Evening",
    performanceScore: 88,
  },
  {
    name: "Mark Johnson",
    role: "Nurse",
    department: "Emergency",
    shift: "Night",
    performanceScore: 85,
  },
  {
    name: "Lisa Chen",
    role: "Nurse",
    department: "Pediatrics",
    shift: "Morning",
    performanceScore: 94,
  },
  {
    name: "Robert Garcia",
    role: "Lab Technician",
    department: "Pathology",
    shift: "Evening",
    performanceScore: 78,
  },
  {
    name: "Emily Davis",
    role: "Receptionist",
    department: "Administration",
    shift: "Morning",
    performanceScore: 82,
  },
  {
    name: "Dr. Michael Brown",
    role: "Doctor",
    department: "Orthopedics",
    shift: "Evening",
    performanceScore: 90,
  },
  {
    name: "Jennifer Smith",
    role: "Nurse",
    department: "Cardiology",
    shift: "Night",
    performanceScore: 87,
  }
];

// Revenue seed data
const generateRevenueData = () => {
  const departments = ['Cardiology', 'Neurology', 'Orthopedics', 'Oncology', 'Pediatrics', 'Emergency', 'Pathology'];
  const paymentMethods = ['Cash', 'Credit Card', 'Insurance', 'Bank Transfer', 'Other'];
  const revenueData = [];
  
  // Generate data for the last 12 months
  for (let i = 0; i < 12; i++) {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    
    // Generate multiple entries for each month
    for (let j = 0; j < 15; j++) {
      const department = departments[Math.floor(Math.random() * departments.length)];
      const paymentMethod = paymentMethods[Math.floor(Math.random() * paymentMethods.length)];
      const amount = Math.floor(Math.random() * 5000) + 500; // Random amount between 500 and 5500
      
      // Random day in the month
      const day = Math.floor(Math.random() * 28) + 1;
      const entryDate = new Date(date.getFullYear(), date.getMonth(), day);
      
      revenueData.push({
        amount,
        department,
        date: entryDate,
        paymentMethod
      });
    }
  }
  
  return revenueData;
};

// Import seed data into DB
const importData = async () => {
  try {
    await Patient.deleteMany();
    await Staff.deleteMany();
    await Revenue.deleteMany();
    
    await Patient.insertMany(patientData);
    await Staff.insertMany(staffData);
    await Revenue.insertMany(generateRevenueData());
    
    console.log('Data imported successfully');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

// Run the import
importData();
