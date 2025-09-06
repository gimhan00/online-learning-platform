const express = require('express');
const { getCourseRecommendations } = require('../controllers/gptController');
const { protect, studentOnly } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/recommend', protect, studentOnly, getCourseRecommendations);

module.exports = router;