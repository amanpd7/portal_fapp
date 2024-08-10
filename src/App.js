import React, { useState, useEffect } from 'react';
import {  BrowserRouter as Router, Route, Navigate, Routes  } from "react-router-dom";
import "./App.css";
import Login from "./Pages/login";
import Form from "./Pages/form";

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const jwt = localStorage.getItem('jwt');
    return !!jwt;
  });

  useEffect(() => {
    const onAuthChange = () => {
      const jwt = localStorage.getItem('jwt');
      setIsAuthenticated(!!jwt);
    };

    window.addEventListener('storage', onAuthChange);

    return () => {
      window.removeEventListener('storage', onAuthChange);
    };
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    setIsAuthenticated(false);
  };


  return (
      <Router>
        <Routes>
        <Route path="/" element={<Navigate replace to={isAuthenticated ? "/form" : "/login"} />} />
        <Route path="/login" element={<Login onLogin={handleLoginSuccess} />} />
        <Route path="/forms" element={isAuthenticated ? <Form onLogout={handleLogout} /> : <Navigate replace to="/login" />} />
        </Routes>
      </Router>
  );
}

export default App;