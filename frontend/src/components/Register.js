import React, { useState } from 'react';
import axios from 'axios';
import '../componentsCSS/Login.css'

const Register = ({ setToken, setRole }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('student');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, { username, password, role: selectedRole });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role);
      setToken(res.data.token);
      setRole(res.data.role);
      alert('Registration successful');
    } catch (err) {
      alert('Error registering');
    }
  };

  return (
    <div className='form-container'>
      <form onSubmit={handleSubmit} className='login-form'>
        <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <select onChange={(e) => setSelectedRole(e.target.value)}>
          <option value="student">Student</option>
          <option value="instructor">Instructor</option>
        </select>
        <button className='btn-register' type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;