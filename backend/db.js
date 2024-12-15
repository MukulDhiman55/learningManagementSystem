const mongoose = require('mongoose');

async function connectToDB() {
  try {
    console.log("Attempting to connect to MongoDB...");
    // Connect to MongoDB using the URI from .env
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB Atlas!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);  // Exit the process if connection fails
  }
}

module.exports = { connectToDB };

