const express = require('express');
const Course = require('../models/Course');
const User = require('../models/User');
const { authenticateUser, authorizeAdmin } = require('../middleware/auth');
const router = express.Router();

// Admin: Add a new course
router.post('/', authenticateUser, authorizeAdmin, async (req, res) => {
  const { title, description, duration, instructor } = req.body;

  try {
    const course = new Course({ title, description, duration, instructor });
    await course.save();
    res.status(201).json(course);
  } catch (error) {
    res.status(400).json({ message: 'Error creating course.' });
  }
});

// Admin: Update an existing course
router.put('/:id', authenticateUser, authorizeAdmin, async (req, res) => {
  const { title, description, duration, instructor } = req.body;

  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      { title, description, duration, instructor },
      { new: true }
    );
    if (!course) return res.status(404).json({ message: 'Course not found.' });
    res.json(course);
  } catch (error) {
    res.status(400).json({ message: 'Error updating course.' });
  }
});

// Admin: Delete a course
router.delete('/:id', authenticateUser, authorizeAdmin, async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found.' });
    res.json({ message: 'Course deleted successfully.' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting course.' });
  }
});

// View all courses (accessible by both Admin and User)
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching courses.' });
  }
});

// View course details (accessible by both Admin and User)
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found.' });
    res.json(course);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching course details.' });
  }
});

// Enroll in a course (accessible by User only)
router.post('/enroll/:id', authenticateUser, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found.' });

    const user = await User.findById(req.user.userId);
    if (!user.enrolledCourses.includes(course._id)) {
      user.enrolledCourses.push(course._id);
      await user.save();
      res.json({ message: 'Successfully enrolled in the course.' });
    } else {
      res.status(400).json({ message: 'Already enrolled in this course.' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error enrolling in the course.' });
  }
});

module.exports = router;

