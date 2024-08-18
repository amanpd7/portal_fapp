import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./merged_styles.css";
import logo from './images/BOSSE_logo.png';

function Login({ onLogin, onNavigateToRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:6969';


  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const response = await axios.post(backendUrl+'/login', {
        username,
        password
      });
      localStorage.setItem('jwt', response.data.token);
      onLogin(username, password);
      navigate('/forms');
    } catch (error) {
      console.error('Login failed:', error.response);
      setError('Login failed. Please check your username and password.');
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="left-section">
        <div className='logo'>
          {<img src={logo} alt="BOSSE_logo" className="logo" />}
        </div>
        <h1>BOARD OF OPEN SCHOOLING & SKILL EDUCATION</h1>
        <p>
          BOSSE (Board of Open Schooling & Education), Sikkim is an open School
          Board to cater to the varied academic needs of divergent groups of
          students up to pre-degree level.
        </p>
      </div>
      <div className="right-section">
        <div className="login-box">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            aria-label="Username"
          />
          <input
            type="password"
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            aria-label="Password"
          />
        <button type="submit" className="button" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
        {error && <div className="error">{error}</div>}
      </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
