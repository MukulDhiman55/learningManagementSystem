const mongoose = require('mongoose');
const Course = require('./models/Course');  // Ensure the path is correct for your Course model

// Dummy course data based on your schema
const courses = [
  {
    title: "React for Beginners",
    description: "Learn the basics of React.js to build interactive UIs.",
    duration: "3 months",
    instructor: "John Doe",
  },
  {
    title: "Advanced Node.js",
    description: "Master Node.js with advanced techniques, APIs, and asynchronous programming.",
    duration: "4 months",
    instructor: "Jane Smith",
  },
  {
    title: "Full-Stack Web Development",
    description: "Learn how to build full-stack web applications using React, Node.js, and MongoDB.",
    duration: "6 months",
    instructor: "Emily Johnson",
  },
  {
    title: "Python for Data Science",
    description: "Learn Python and its libraries to analyze data, build machine learning models, and visualize data.",
    duration: "5 months",
    instructor: "David Williams",
  },
  {
    title: "Intro to JavaScript",
    description: "Learn JavaScript fundamentals to get started with web development.",
    duration: "2 months",
    instructor: "Sarah Lee",
  },
];

// MongoDB Atlas connection string
const mongoURI = 'mongodb+srv://mukdhiman12:2lkImEpruofaU50H@cluster0.kc02r.mongodb.net/?retryWrites=true&w=majority';

// Replace <username>, <password>, and <dbname> with your MongoDB Atlas credentials and database name
mongoose.connect(mongoURI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
  .then(() => {
    // Insert dummy courses into the database
    Course.insertMany(courses)
      .then(() => {
        console.log('Courses seeded successfully!');
        mongoose.connection.close();  // Close the database connection after seeding
      })
      .catch((err) => {
        console.error('Error inserting courses:', err);
        mongoose.connection.close();
      });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB Atlas:', err);
  });

