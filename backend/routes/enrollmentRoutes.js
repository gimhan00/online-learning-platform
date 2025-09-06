const express = require('express');
const { enrollInCourse, unenrollFromCourse, getEnrolledCourses } = require('../controllers/enrollmentController');
const { protect, studentOnly } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/:id/enroll', protect, studentOnly, enrollInCourse);
router.delete('/:id/unenroll', protect, studentOnly, unenrollFromCourse); 
router.get('/enrolled', protect, studentOnly, getEnrolledCourses);

module.exports = router;