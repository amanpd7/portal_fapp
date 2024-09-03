import React, { useContext, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./merged_styles.css"; // Import the CSS for styling
import logo from "./images/bosse.png";
import { FormContext } from "./FormContext"; // Import the context

const DocForm = () => {
  const { formData, documents, setDocuments } = useContext(FormContext);
  const navigate = useNavigate();

  const getInitialDocuments = useCallback(() => {
    if (formData.course === "SECONDARY") {
      return [
        { title: "Last Qualified Exam", yearOfPassing: "", file: null, fileName: "" },
        { title: "AADHAR Front", file: null, fileName: "" },
        { title: "AADHAR Back", file: null, fileName: "" },
      ];
    } else if (formData.course === "SENIOR-SECONDARY") {
      return [
        { title: "VIII", yearOfPassing: "", file: null, fileName: "" },
        { title: "Last Qualified Exam", yearOfPassing: "", file: null, fileName: "" },
        { title: "AADHAR Front", file: null, fileName: "" },
        { title: "AADHAR Back", file: null, fileName: "" },
      ];
    } else {
      return [];
    }
  }, [formData.course]);

  useEffect(() => {
    if (documents.length === 0) {
      const initialDocuments = getInitialDocuments();
      setDocuments(initialDocuments);
    }
  }, [getInitialDocuments, documents.length, setDocuments]);

  const handleFileChange = (index, e) => {
    const file = e.target.files[0];
    const maxSize = 400 * 1024; // 400KB in bytes

    if (file && file.size > maxSize) {
      alert("File size exceeds the 400KB limit. Please upload a smaller file.");
      return;
    }

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
    } else if (formData.course === "SENIOR-SECONDARY") {
      navigate("/sub12"); // Navigate to /sub12
    }
  };

  return (
    <div>
      <header className="form-header">
        <div className="logo-section">
          <img src={logo} alt="Bosse Logo" className="logo" />
        </div>
        <h1 className="form-title">Documents Upload Form</h1>
        <div className="header-right">
          <button className="header-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>
      <div className="form-container">
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
          <h2>Upload your Documents</h2>
        </div>
        <div className="education-details">
          {documents.map((doc, index) => {
            if (doc.title.startsWith("AADHAR")) {
              return (
                <div key={`aadhar-${index}`} className="doc-row">
                  {doc.title === "AADHAR Front" && (
                    <>
                      <div className="doc-info">
                        <label>AADHAR Front</label>
                        <input
                          type="file"
                          onChange={(e) => handleFileChange(index, e)}
                          accept=".pdf,.jpg,.jpeg,.png"
                        />
                        {doc.fileName && <span>{doc.fileName}</span>}
                      </div>
                      <div className="doc-info">
                        <label>AADHAR Back</label>
                        <input
                          type="file"
                          onChange={(e) => handleFileChange(index + 1, e)} // Index for the back file
                          accept=".pdf,.jpg,.jpeg,.png"
                        />
                        {documents[index + 1].fileName && <span>{documents[index + 1].fileName}</span>}
                      </div>
                    </>
                  )}
                </div>
              );
            } else {
              return (
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
              );
            }
          })}
        </div>

        <div className="button-container">
          <button className="back-button" onClick={handleBack}>
            Back
          </button>
          <button className="next-button" onClick={handleNext}>
            Next
          </button>
        </div>
        <footer className="form-footer">
          <p>&copy; 2024 https://panel.org.in All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default DocForm;
