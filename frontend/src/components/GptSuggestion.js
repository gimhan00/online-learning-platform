import React, { useState } from 'react';
import axios from 'axios';
import '../componentsCSS/gpt.css'

const GptSuggestion = ({ token }) => {
  const [prompt, setPrompt] = useState('');
  const [recommendations, setRecommendations] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/gpt/recommend`, { prompt }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRecommendations(res.data.recommendations);
    } catch (err) {
      alert('Error getting recommendations');
    }
  };

  return (
    <div className='gpt-container'>
      <h2>Get Course Suggestions</h2>
      <form onSubmit={handleSubmit} className='gpt-form'>
        <input
          type="text"
          placeholder="e.g., I want to be a software engineer, what courses should I follow"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button className='btn-gpt' type="submit">Get Recommendations</button>
      </form>
      {recommendations && <p>{recommendations}</p>}
    </div>
  );
};

export default GptSuggestion;