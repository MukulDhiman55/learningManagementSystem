// createAdmin.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User'); // Adjust the path to your User model

// MongoDB Atlas connection string
const dbURI = 'mongodb+srv://mukdhiman12:2lkImEpruofaU50H@cluster0.kc02r.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(async () => {
    console.log("Connected to MongoDB");

    

    // Create the admin user with the hashed password
    const adminUser = new User({
      username: 'administrator',
      email: 'admin@123.com',
      password: '12355', // This is the hashed password
      role: 'admin',  // Assign the role of admin
    });

    // Save the admin user to the database
    await adminUser.save();

    console.log("Admin user created!");

    // Close the database connection
    mongoose.connection.close();
  })
  .catch(err => {
    console.error("Error connecting to MongoDB", err);
  });
