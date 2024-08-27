import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./success.css";

const SuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const formNumber = location.state?.formNumber;
  const admissionsCount = parseInt(localStorage.getItem('admissionsCount'), 10) || 0;

  useEffect(() => {
    const updatedAdmissionsCount = admissionsCount + 1;
    localStorage.setItem('admissionsCount', updatedAdmissionsCount);

    // Redirect to /forms after 5 seconds
    const timer = setTimeout(() => {
      navigate("/forms", { state: { admissionsCount: updatedAdmissionsCount } });
    }, 5000);

    // Cleanup the timer if the component is unmounted before the time is up
    return () => clearTimeout(timer);
  }, [navigate, admissionsCount]);

  return (
    <div className="success-container">
      <div className="success-card">
        <div className="success-icon">
          <span>&#10004;</span> {/* Tick icon */}
        </div>
        <h1 className="success-message">Thank You</h1>
        <p className="success-submessage">
            Your form has been submitted successfully. Your form number is: <strong>{formNumber}</strong>.
            For other information, contact your official Coordinator.
        </p>
        {/* <button className="home-button">Go to New Form</button> */}
      </div>
      <footer className="copyright-footer">
        <p>&copy; 2024 https://panel.org.in All rights reserved.</p>
      </footer>
    </div>
  );
};

export default SuccessPage;
