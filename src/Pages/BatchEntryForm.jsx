// Importing React and useState hook for state management
import React, { useState } from 'react';

// Importing useNavigate hook from react-router-dom to handle navigation
import { useNavigate } from 'react-router-dom';

// Importing ToastContainer and toast from react-toastify to display notifications
import { toast, toastContainer } from '../toastservice';

// Importing Firebase Firestore instance
import { db } from '../firebase';

// Importing Firestore functions for batch writing
import { collection, doc, writeBatch } from 'firebase/firestore';

// Importing Sidebar component for the navigation sidebar
import Sidebar from '../Components/sidebar/Staff_Sidebar';

// Importing Navbar component for the top navigation bar
import Navbar from '../Components/navbar/Navbar';

// Importing styles for the batch entry form
import '../SassyCSS/batchentryform.scss';

const BatchEntryForm = () => {
  // useNavigate hook to programmatically navigate to different routes
  const navigate = useNavigate();

  // State variables for form inputs
  const [emails, setEmails] = useState('');
  const [department, setDepartment] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [jobRole, setJobRole] = useState('');
  const [sbatch, setSbatch] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailList = emails.split(/\s*,\s*|\s+/).filter(email => email); // Split by commas or whitespace
    // Get current date and time in IST
    const now = new Date();
    const timestamp = now.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    try {
      const batch = writeBatch(db); // Create a batch instance
      const studentsRef = collection(db, 'PlacedStudents'); // Reference to 'PlacedStudents' collection

      // Add each email to the batch with the provided details
      emailList.forEach(email => {
        const newDoc = doc(studentsRef);
        batch.set(newDoc, {
          timestamp, // Add timestamp as a field in the document
          email,
          department,
          company_name: companyName,
          job_role: jobRole,
          sbatch,
        });
      });

      await batch.commit(); // Commit the batch

      // Show success toast message
      toast.success('Students added successfully!');
      setTimeout(() => {
        navigate('/AddPlacementResults'); // Navigate to results page after success
      }, 2000);

      // Clear the form inputs
      setEmails('');
      setDepartment('');
      setCompanyName('');
      setJobRole('');
      setSbatch('');
    } catch (error) {
      console.error('Error adding documents: ', error);
      // Show error toast message
      toast.error('Error adding students!');
    }
  };

  return (
    <div className='batch'>
      {/* ToastContainer to display toast notifications */}
      {toastContainer}

      {/* Sidebar component for the navigation sidebar */}
      <Sidebar />

      <div className="batchentrycontainer">
        {/* Navbar component for the top navigation bar */}
        <Navbar />

        {/* Form container */}
        <div className="form-container">
          <h2>Batch Entry Form</h2>
          <form onSubmit={handleSubmit} autoComplete='off'>
            {/* Email input field */}
            <div className="form-group">
              <label htmlFor="emails">Email IDs</label>
              <textarea
                id="emails"
                value={emails}
                onChange={(e) => setEmails(e.target.value)}
                required
                rows="4"
                placeholder="Enter multiple email IDs separated by commas or spaces"
              />
            </div>

            {/* Department input field */}
            <div className="form-group">
              <label htmlFor="department">Department</label>
              <select type="text"
                id="department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder='BCA / MCA / B.Sc / M.Sc / B.Tech / M.Tech'
                required >
                <option value="">Select Department</option>
                <option value="BCA">BCA</option>
                <option value="MCA">MCA</option>
                <option value="B.Sc">B.Sc</option>
                <option value="M.Sc">M.Sc</option>
                <option value="B.Tech">B.Tech</option>
                <option value="M.Tech">M.Tech</option>
              </select>
            </div>

            {/* Department input field */}
            <div className="form-group">
              <label htmlFor="deparsbatchtment">Batch</label>
              <select type="text"
                id="sbatch"
                value={sbatch}
                onChange={(e) => setSbatch(e.target.value)}
                required >
                <option value="">Select Batch</option>
                {Array.from({ length: 50 }, (_, i) => 1975 + i).map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>

            {/* Company name input field */}
            <div className="form-group">
              <label htmlFor="companyName">Company Name</label>
              <input
                type="text"
                id="companyName"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
              />
            </div>

            {/* Job role input field */}
            <div className="form-group">
              <label htmlFor="jobRole">Job Role</label>
              <input
                type="text"
                id="jobRole"
                value={jobRole}
                onChange={(e) => setJobRole(e.target.value)}
                required
              />
            </div>

            {/* Submit button */}
            <button type="submit">Add Students</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BatchEntryForm;
