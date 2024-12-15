const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/auth');
const courseRoutes = require('./routes/course');

// Import the database connection function
const { connectToDB } = require('./db');

// Initialize the Express app
const app = express();

// Middleware
app.use(cors());  // Allow cross-origin requests
app.use(express.json());  // Parse incoming JSON requests

// Log to confirm the server is starting
console.log("Initializing server...");

// Connect to MongoDB using the function from db.js
connectToDB(); // Establish connection

// Define Routes
app.use('/api/auth', authRoutes);  // Authentication routes
app.use('/api/courses', courseRoutes);  // Course management routes

// Server setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

