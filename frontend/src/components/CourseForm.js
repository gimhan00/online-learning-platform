import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../componentsCSS/CourseForm.css';

const CourseForm = ({ token, initialData, onSubmit, onCancel }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [content, setContent] = useState(initialData?.content || '');

  
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setDescription(initialData.description || '');
      setContent(initialData.content || '');
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const courseData = {
      _id: initialData?._id,
      title,
      description,
      content,
    };
    try {
      if (!courseData._id) {
        
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/courses`, { title, description, content }, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert('Course created');
        if (onCancel) onCancel(); 
        setTitle('');
        setDescription('');
        setContent('');
      } else {
        
        await onSubmit(courseData);
      }
    } catch (err) {
      alert('Error: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className='course-container'>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
        />
        <div>
          <button className='btn-create' type="submit">Save</button>
          {onCancel && <button className='btn-cancel' type="button" onClick={onCancel}>Cancel</button>}
        </div>
      </form>
    </div>
  );
};

export default CourseForm;