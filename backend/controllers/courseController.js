const Course = require('../models/Course');

const createCourse = async (req, res) => {
  const { title, description, content } = req.body;
  const course = await Course.create({
    title,
    description,
    content,
    instructor: req.user._id,
  });
  res.status(201).json(course);
};

const getCourses = async (req, res) => {
  const courses = await Course.find({}).populate('instructor', 'username');
  res.json(courses);
};

const getCourseById = async (req, res) => {
  const course = await Course.findById(req.params.id).populate('instructor', 'username').populate('enrolledStudents', 'username');
  if (course) res.json(course);
  else res.status(404).json({ message: 'Course not found' });
};

const updateCourse = async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (course && course.instructor.toString() === req.user._id.toString()) {
    course.title = req.body.title || course.title;
    course.description = req.body.description || course.description;
    course.content = req.body.content || course.content;
    const updatedCourse = await course.save();
    res.json(updatedCourse);
  } else {
    res.status(404).json({ message: 'Course not found or unauthorized' });
  }
};

const deleteCourse = async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (course && course.instructor.toString() === req.user._id.toString()) {
    await course.deleteOne();
    res.json({ message: 'Course removed' });
  } else {
    res.status(404).json({ message: 'Course not found or unauthorized' });
  }
};

const getInstructorCourses = async (req, res) => {
  const courses = await Course.find({ instructor: req.user._id });
  res.json(courses);
};


module.exports = { createCourse, getCourses, getCourseById, updateCourse, deleteCourse, getInstructorCourses };