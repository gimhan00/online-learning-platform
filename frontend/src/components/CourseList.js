import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CourseForm from './CourseForm'; 
import '../componentsCSS/CourseList.css';

const CourseList = ({ token, role }) => {
  const [courses, setCourses] = useState([]);
  const [editCourseId, setEditCourseId] = useState(null); 

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/courses`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCourses(res.data);
      } catch (err) {
        console.error('Error fetching courses:', err);
      }
    };
    fetchCourses();
  }, [token]);

  const handleEnroll = async (id) => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/enrollments/${id}/enroll`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Enrollment successful');
    } catch (err) {
      alert('Error enrolling: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleEdit = (id) => {
    setEditCourseId(id); 
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/courses/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCourses(courses.filter(course => course._id !== id));
        alert('Course deleted successfully');
      } catch (err) {
        alert('Error deleting course: ' + (err.response?.data?.message || err.message));
      }
    }
  };

  const handleUpdate = async (updatedCourse) => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/courses/${updatedCourse._id}`, updatedCourse, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCourses(courses.map(course => course._id === updatedCourse._id ? updatedCourse : course));
      setEditCourseId(null); 
      alert('Course updated successfully');
    } catch (err) {
      alert('Error updating course: ' + (err.response?.data?.message || err.message));
    }
  };

  const userId = localStorage.getItem('userId');

  return (
    <div className='list-container'>
      <h2>Available Courses</h2>
      {courses.map((course) => (
        <div key={course._id} className='course-item'>
          <h3>{course.title}</h3>
          <p>{course.description}</p>
          {role === 'student' && <button className='btn-enroll' onClick={() => handleEnroll(course._id)}>Enroll</button>}
          {role === 'instructor' && userId && course.instructor?._id?.toString() === userId && !editCourseId && (
            <>
              <button className='edit-button' onClick={() => handleEdit(course._id)}>Edit</button>
              <button className='delete-button' onClick={() => handleDelete(course._id)}>Delete</button>
            </>
          )}
          {editCourseId === course._id && course && (
            <CourseForm
              token={token}
              initialData={course}
              onSubmit={handleUpdate}
              onCancel={() => setEditCourseId(null)}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default CourseList;