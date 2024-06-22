import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { db } from '../firebase';
import { collection, doc, writeBatch } from 'firebase/firestore';
import Sidebar from '../Components/sidebar/Staff_Sidebar';
import Navbar from '../Components/navbar/Navbar';
import '../SassyCSS/batchentryform.scss';

const BatchEntryForm = () => {
  const navigate = useNavigate();
  const [emails, setEmails] = useState('');
  const [department, setDepartment] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [jobRole, setJobRole] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailList = emails.split(/\s*,\s*|\s+/).filter(email => email); // Split by commas or whitespace

    try {
      const batch = writeBatch(db);
      const studentsRef = collection(db, 'PlacedStudents');

      emailList.forEach(email => {
        const newDoc = doc(studentsRef);
        batch.set(newDoc, {
          email,
          department,
          company_name: companyName,
          job_role: jobRole,
        });
      });

      await batch.commit();
      // Show success toast message
      toast.success('Students added successfully!');
      setTimeout(() => {
        navigate('/AddPlacementResults');
    }, 2000);
      setEmails(''); // Clear the input
      setDepartment(''); // Clear the department input
      setCompanyName(''); // Clear the company name input
      setJobRole(''); // Clear the job role input
    } catch (error) {
      console.error('Error adding documents: ', error);
      // Show error toast message
      toast.error('Error adding students!');
    }
  };

  return (
    <div className='batch'>
       <ToastContainer position="top-center" autoClose={4000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <Sidebar />
      <div className="batchentrycontainer">
        <Navbar />
        <div className="form-container">
          <h2>Batch Entry Form</h2>
          <form onSubmit={handleSubmit} autoComplete='off'>
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
            <div className="form-group">
              <label htmlFor="department">Department</label>
              <input
                type="text"
                id="department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                required
              />
            </div>
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
            <button type="submit">Add Students</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BatchEntryForm;
