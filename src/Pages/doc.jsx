import React, { useContext, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./merged_styles.css"; // Import the CSS for styling
import logo from "./images/bosse.jpg";
import { FormContext } from "./FormContext"; // Import the context

const DocForm = () => {
  const { formData, documents, setDocuments } = useContext(FormContext); // Use the form data and documents from the context
  const navigate = useNavigate();

  // Set up document list based on selected course
  const getInitialDocuments = useCallback(() => {
    console.log("formData.course:", formData.course); // Debugging
    if (formData.course === "SECONDARY") {
      return [
        { title: "VII", yearOfPassing: "", file: null, fileName: "" },
        { title: "X", yearOfPassing: "", file: null, fileName: "" },
        { title: "AADHAR", yearOfPassing: "", file: null, fileName: "" },
      ];
    } else if (formData.course === "SENIOR SECONDARY") {
      return [
        { title: "VII", yearOfPassing: "", file: null, fileName: "" },
        { title: "X", yearOfPassing: "", file: null, fileName: "" },
        { title: "XII", yearOfPassing: "", file: null, fileName: "" },
        { title: "AADHAR", file: null, fileName: "" },
      ];
    } else {
      return [];
    }
  }, [formData.course]);

  useEffect(() => {
    if (documents.length === 0) {
      const initialDocuments = getInitialDocuments();
      console.log("Initial Documents:", initialDocuments); // Debugging
      setDocuments(initialDocuments);
    }
  }, [getInitialDocuments, documents.length, setDocuments]);

  const handleFileChange = (index, e) => {
    const file = e.target.files[0];
    const newDocuments = [...documents];
    newDocuments[index].file = file;
    newDocuments[index].fileName = file ? file.name : "";
    setDocuments(newDocuments); // Update context with new document data
  };

  const handleYearOfPassingChange = (index, e) => {
    const newDocuments = [...documents];
    newDocuments[index].yearOfPassing = e.target.value;
    setDocuments(newDocuments); // Update context with new document data
  };

  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  const handleLogout = () => {
    localStorage.clear(); // Assuming you store user data in localStorage
    navigate("/login"); // Redirect to login page after logout
  };

  const handleNext = () => {
    if (formData.course === "SECONDARY") {
      navigate("/sub10"); // Navigate to /sub10
    } else if (formData.course === "SENIOR SECONDARY") {
      navigate("/sub12"); // Navigate to /sub12
    }
  };

  return (
    <div>
      <div className="logo-section">
        <img src={logo} alt="Bosse Logo" className="logo" />
      </div>
      <div className="form-container">
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
        <div className="section-header">
          <h2>Student Details</h2>
        </div>
        <div className="student-details">
          {formData.selectedImage && (
            <img
              src={formData.selectedImage}
              alt="Student"
              className="student-photo"
            />
          )}
          <div className="student-info">
            <div>
              <label>Batch</label>
              <input
                type="text"
                value={formData.admissionSession || ""}
                readOnly
              />
            </div>
            <div>
              <label>Course</label>
              <input type="text" value={formData.course || ""} readOnly />
            </div>
            <div>
              <label>Student's Name</label>
              <input type="text" value={formData.studentName || ""} readOnly />
            </div>
            <div>
              <label>Father's Name</label>
              <input type="text" value={formData.fatherName || ""} readOnly />
            </div>
          </div>
        </div>

        <div className="section-header">
          <h2>Details Of Educational Qualifications</h2>
        </div>
        <div className="education-details">
          {documents.map((doc, index) => (
            <div key={index} className="doc-row">
              <div className="doc-info">
                <input type="text" value={doc.title} readOnly />
              </div>
              <div className="doc-info">
                <input
                  type="text"
                  placeholder="Year of Passing"
                  value={doc.yearOfPassing}
                  onChange={(e) => handleYearOfPassingChange(index, e)}
                />
              </div>
              <div className="doc-upload">
                <input
                  type="file"
                  onChange={(e) => handleFileChange(index, e)}
                  accept=".pdf,.jpg,.jpeg,.png"
                />
                {doc.fileName && <span>{doc.fileName}</span>}
              </div>
            </div>
          ))}
        </div>

        <div className="button-container">
          <button className="back-button" onClick={handleBack}>
            Back
          </button>
          <button className="next-button" onClick={handleNext}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocForm;
