import React from "react";
import { useAuth } from "../AuthProvider";

const Form = () => {
  const { user } = useAuth();

  if (!user) {
    return <p>Please login to access this form.</p>;
  }

  return (
    <div className="form-container">
      <form>
        <div className="form-section">
          <label>Student's Photo</label>
          <input type="file" accept="image/*" />
          <button type="button">Upload</button>
        </div>

        <div className="form-section">
          <h3>Details</h3>
          <label>Admission Mode *</label>
          <select required>
            <option value="fresh">FRESH</option>
            <option value="transfer">TRANSFER</option>
          </select>

          <label>Admission Session *</label>
          <input type="text" value="BLOCK 2: 2024 (M-24)" disabled />

          <label>Course (Applying for) *</label>
          <select required>
            <option value="secondary">SECONDARY</option>
            <option value="higher-secondary">HIGHER SECONDARY</option>
          </select>

          <label>Student's Name *</label>
          <input type="text" required />

          <label>Father's Name *</label>
          <input type="text" required />

          <label>Mother's Name *</label>
          <input type="text" required />

          <label>Gender *</label>
          <select required>
            <option value="male">MALE</option>
            <option value="female">FEMALE</option>
          </select>

          <label>Date of Birth *</label>
          <input type="date" required />

          <label>Category *</label>
          <select required>
            <option value="sc">S.C.</option>
            <option value="st">S.T.</option>
          </select>
        </div>

        <div className="form-section">
          <h3>Permanent Address *</h3>
          <textarea required></textarea>

          <label>Country *</label>
          <select required>
            <option value="india">INDIA</option>
          </select>

          <label>State *</label>
          <select required>
            <option value="tamilnadu">TAMIL NADU</option>
          </select>

          <label>City *</label>
          <input type="text" required />

          <label>Pin Code *</label>
          <input type="text" required />

          <label>Contact No. *</label>
          <input type="tel" required />

          <label>Email Address *</label>
          <input type="email" required />

          <label>Aadhar No.</label>
          <input type="text" />
        </div>

        <div className="form-section">
          <h3>Details Of Educational Qualifications</h3>
          <label>Subjects</label>
          <input type="text" />

          <label>Year of Passing</label>
          <input type="number" />

          <label>University/Board</label>
          <input type="text" />

          <label>Division/Grade</label>
          <input type="text" />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;
