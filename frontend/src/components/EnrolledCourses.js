import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../componentsCSS/CourseList.css';

const EnrolledCourses = ({ token }) => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchEnrolled = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/enrollments/enrolled`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCourses(res.data);
      } catch (err) {
        console.error('Error fetching enrolled courses:', err);
      }
    };
    fetchEnrolled();
  }, [token]);

  const handleUnenroll = async (courseId) => {
    if (window.confirm('Are you sure you want to unenroll from this course?')) {
      try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/enrollments/${courseId}/unenroll`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCourses(courses.filter(course => course._id !== courseId));
        alert('Unenrollment successful');
      } catch (err) {
        alert('Error unenrolling: ' + (err.response?.data?.message || err.message));
      }
    }
  };

  return (
    <div className='list-container'>
      <h2>My Enrolled Courses</h2>
      {courses.map((course) => (
        <div key={course._id} className='course-item'>
          <h3>{course.title}</h3>
          <p>{course.description}</p>
          {course.content && <div className='course-content'><strong>Content:</strong> {course.content}</div>}
          <button className='unenroll-button' onClick={() => handleUnenroll(course._id)}>Unenroll</button>
        </div>
      ))}
    </div>
  );
};

export default EnrolledCourses;