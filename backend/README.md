# Hospital Management System Backend

This is the backend for the Hospital Management System.

## Setup and Installation

1. Install dependencies:
```
npm install
```

2. Set Environment Variables:
Create a `.env` file in the root directory with the following variables:
```
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb+srv://itzmeperi:Peri@cluster0.uqz6k.mongodb.net/?retryWrites=true&majority&appName=Cluster0
```

3. Seed the database with initial data:
```
npm run seed
```

4. Start the server:
```
npm start
```

## API Endpoints

### Patients
- GET `/api/patients` - Get all patients
- POST `/api/patients` - Create a new patient
- GET `/api/patients/:id` - Get a specific patient
- PUT `/api/patients/:id` - Update a patient
- DELETE `/api/patients/:id` - Delete a patient
- POST `/api/patients/:id/upload` - Upload medical report for a patient

### Staff
- GET `/api/staff` - Get all staff members
- POST `/api/staff` - Create a new staff member
- GET `/api/staff/:id` - Get a specific staff member
- PUT `/api/staff/:id` - Update a staff member
- DELETE `/api/staff/:id` - Delete a staff member

### Revenue
- GET `/api/revenue` - Get all revenue data
- POST `/api/revenue` - Create a new revenue entry

### Symptom Checker
- POST `/api/symptoms/check` - Check symptoms and get possible conditions
