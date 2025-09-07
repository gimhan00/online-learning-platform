import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import CourseList from './components/CourseList';
import EnrolledCourses from './components/EnrolledCourses';
import GptSuggestion from './components/GptSuggestion';
import CourseForm from './components/CourseForm';
import './styles.css';

const LogoutButton = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return <button onClick={handleLogout}>Logout</button>;
};

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [role, setRole] = useState(localStorage.getItem('role'));

  const logout = () => {
    localStorage.clear();
    setToken(null);
    setRole(null);
  };

  const handleCreateCancel = () => {
    
  };

  return (
    <Router>
      <nav>
        {!token ? (
          <>
            <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            <Link to="/courses">Courses</Link>
            {role === 'student' && (
              <>
                {' | '}
                <Link to="/enrolled">My Enrolled Courses</Link> | <Link to="/gpt">GPT Suggestions</Link>
              </>
            )}
            {role === 'instructor' && (
              <>
                {' | '}
                <Link to="/create-course">Create Course</Link>
              </>
            )}
            {' | '}
            <LogoutButton onLogout={logout} />
          </>
        )}
      </nav>
      <Routes>
        <Route path="/login" element={<Login setToken={setToken} setRole={setRole} />} />
        <Route path="/register" element={<Register setToken={setToken} setRole={setRole} />} />
        <Route path="/courses" element={<CourseList token={token} role={role} />} />
        <Route path="/enrolled" element={<EnrolledCourses token={token} />} />
        <Route path="/gpt" element={<GptSuggestion token={token} />} />
        <Route
          path="/create-course"
          element={<CourseForm token={token} onCancel={handleCreateCancel} />}
        />
      </Routes>
    </Router>
  );
}

export default App;