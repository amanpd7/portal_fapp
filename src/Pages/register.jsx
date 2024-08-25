import React, { useState } from 'react';
import axios from 'axios';
import './merged_styles.css';

function RegisterModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    name: ''
  });
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
    const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const token = localStorage.getItem('jwt');

    try {
      const response = await axios.post(backendUrl + '/register', formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('User registered successfully:', response.data);
      onClose();
    } catch (error) {
      console.error('There was an error registering the user:', error);
      setError('There was an error registering the user. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Register New User</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit" onClick={handleSubmit}>Register</button>
          <button type="button" onClick={onClose}>Close</button>
            {error && <div className="error">{error}</div>}
        </form>
      </div>
    </div>
  );
}

export default RegisterModal;