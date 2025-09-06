const Course = require('../models/Course');
const User = require('../models/User');

const enrollInCourse = async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (course) {
    if (course.enrolledStudents.includes(req.user._id)) {
      return res.status(400).json({ message: 'Already enrolled' });
    }
    course.enrolledStudents.push(req.user._id);
    await course.save();

    const user = await User.findById(req.user._id);
    user.enrolledCourses.push(course._id);
    await user.save();

    res.json({ message: 'Enrollment successful' });
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
};

const unenrollFromCourse = async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (course) {
    const userId = req.user._id;
    if (!course.enrolledStudents.includes(userId)) {
      return res.status(400).json({ message: 'Not enrolled in this course' });
    }
    course.enrolledStudents = course.enrolledStudents.filter(id => id.toString() !== userId.toString());
    await course.save();

    const user = await User.findById(userId);
    user.enrolledCourses = user.enrolledCourses.filter(id => id.toString() !== course._id.toString());
    await user.save();

    res.json({ message: 'Unenrollment successful' });
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
};

const getEnrolledCourses = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate({
      path: 'enrolledCourses',
      model: 'Course',
      select: 'title description content', // Explicitly include content
    });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user.enrolledCourses);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching enrolled courses', error: err.message });
  }
};

module.exports = { enrollInCourse, unenrollFromCourse, getEnrolledCourses };    