const express = require('express');
const { createCourse, getCourses, getCourseById, updateCourse, deleteCourse, getInstructorCourses } = require('../controllers/courseController');
const { protect, instructorOnly } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getCourses);
router.get('/:id', getCourseById);
router.post('/', protect, instructorOnly, createCourse);
router.put('/:id', protect, instructorOnly, updateCourse);
router.delete('/:id', protect, instructorOnly, deleteCourse);
router.get('/instructor', protect, instructorOnly, getInstructorCourses);

module.exports = router;