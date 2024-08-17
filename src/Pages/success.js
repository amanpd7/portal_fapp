import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./success.css";

const SuccessPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to /forms after 3 seconds
    const timer = setTimeout(() => {
      navigate("/forms");
    }, 3000);

    // Cleanup the timer if the component is unmounted before the time is up
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="success-container">
      <div className="success-card">
        <div className="success-icon">
          <span>&#10004;</span> {/* Tick icon */}
        </div>
        <h1 className="success-message">Thank You</h1>
        <p className="success-submessage">
          Your form has been submitted successfully. For other information
          contact your official Coordinator.
        </p>
        {/* <button className="home-button">Go to New Form</button> */}
      </div>
      <footer className="copyright-footer">
        <p> Website-www.panel.org.in</p>
      </footer>
    </div>
  );
};

export default SuccessPage;