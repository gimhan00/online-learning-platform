import React, { useState } from 'react';
import axios from 'axios';
import '../componentsCSS/Login.css'

const Login = ({ setToken, setRole }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, { username, password });
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('role', res.data.role);
    localStorage.setItem('userId', res.data._id); 
    setToken(res.data.token);
    setRole(res.data.role);
    alert('Login successful');
  } catch (err) {
    alert('Invalid credentials');
  }
};

  return (
    <div className='form-container'>
      <form onSubmit={handleSubmit} className='login-form'>
        <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <button className='btn-login' type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;