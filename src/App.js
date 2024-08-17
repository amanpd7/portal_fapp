import React, { useState, useEffect } from 'react';
import {  BrowserRouter as Router, Route, Navigate, Routes  } from "react-router-dom";
import { FormProvider } from './Pages/FormContext'; // Import the FormProvider
import "./App.css";
import Login from "./Pages/login";
import Form from "./Pages/form";
import DocForm from "./Pages/doc";
import SubjectSelectionForm from "./Pages/sub10";
import SubjectSelectionForm2 from "./Pages/sub12";
import SuccessPage from './Pages/success';

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
    <FormProvider>
      <Router>
        <Routes>
        <Route path="/" element={<Navigate replace to={isAuthenticated ? "/forms" : "/login"} />} />
        <Route path="/login" element={<Login onLogin={handleLoginSuccess} />} />
        <Route path="/forms" element={isAuthenticated ? <Form onLogout={handleLogout} /> : <Navigate replace to="/login" />} />
        <Route path="/docs" element={isAuthenticated ? <DocForm onLogout={handleLogout} /> : <Navigate replace to="/login" />} />
        <Route path="/sub10" element={isAuthenticated ? <SubjectSelectionForm onLogout={handleLogout} /> : <Navigate replace to="/login" />} />
        <Route path="/sub12" element={isAuthenticated ? <SubjectSelectionForm2 onLogout={handleLogout} /> : <Navigate replace to="/login" />} />
        <Route path="/success" element={isAuthenticated ? <SuccessPage onLogout={handleLogout} /> : <Navigate replace to="/login" />} />
        </Routes>
      </Router>
      </FormProvider>
  );
}

export default App;