import React, { useState } from 'react';
import '../styles/UserForm.css';

const UserForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    collegeId: '',
    phone: '',
    year: '',
    department: ''
  });

  const [resumeFile, setResumeFile] = useState(null);
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setResumeFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);
    
    try {
      const formDataToSend = new FormData();
      
      // Append all form fields
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });
      
      // Append file if exists
      if (resumeFile) {
        formDataToSend.append('resume', resumeFile);
      }

      const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        body: formDataToSend, // No Content-Type header for FormData
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      setMessage(`
        Registration successful! 
        A confirmation email has been sent to ${formData.email}.
        Please check your inbox (and spam folder).
      `);
      
      setIsError(false);
      setFormData({
        name: '',
        email: '',
        collegeId: '',
        phone: '',
        year: '',
        department: ''
      });
      setResumeFile(null);

    } catch (error) {
      setMessage(error.message || 'An unexpected error occurred. Please try again.');
      setIsError(true);
      console.error('Registration error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Registration Form</h2>
      
      {message && (
        <div className={`alert ${isError ? 'error' : 'success'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-group">
          <label>Full Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={isSubmitting}
          />
        </div>
        
        <div className="form-group">
          <label>Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={isSubmitting}
          />
        </div>
        
        <div className="form-group">
          <label>College ID *</label>
          <input
            type="text"
            name="collegeId"
            value={formData.collegeId}
            onChange={handleChange}
            required
            disabled={isSubmitting}
          />
        </div>
        
        <div className="form-group">
          <label>Phone Number *</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            disabled={isSubmitting}
          />
        </div>
        
        <div className="form-group">
          <label>Year *</label>
          <select
            name="year"
            value={formData.year}
            onChange={handleChange}
            required
            disabled={isSubmitting}
          >
            <option value="">Select Year</option>
            <option value="1st">1st Year</option>
            <option value="2nd">2nd Year</option>
            <option value="3rd">3rd Year</option>
            <option value="4th">4th Year</option>
          </select>
        </div>
        
        <div className="form-group">
          <label>Department *</label>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
            disabled={isSubmitting}
          >
            <option value="">Select Department</option>
            <option value="CSE">Computer Science</option>
            <option value="CSD">Computer Science (Data Science)</option>
            <option value="IT">Information Technology</option>
            <option value="ECE">Electronics and Communication</option>
            <option value="EEE">Electrical and Electronics</option>
            <option value="CIVIL">Civil Engineering</option>
            <option value="MECHANICAL">Mechanical Engineering</option>
          </select>
        </div>
         <div className="form-group">
          <label>Upload Resume (PDF/DOC/DOCX, max 5MB)</label>
          <input
            type="file"
            name="resume"
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx"
            disabled={isSubmitting}
          />
          {resumeFile && (
            <p className="file-info">Selected: {resumeFile.name}</p>
          )}
        </div>
        
        
        <button 
          type="submit" 
          className="submit-btn"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Processing...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default UserForm;