import React, { useEffect, useRef } from 'react';  // Import React, useState, and useEffect from React library
import { useNavigate } from 'react-router-dom';  // Import useNavigate hook from React Router
import { auth } from "../firebase";  // Import auth and db from Firebase
import { toast, toastContainer } from '../toastservice'; // Import ToastContainer and toast from react-toastify
// Importing styles for the list of students component
import '../SassyCSS/listofstudents.scss';

// Importing Sidebar component for the navigation sidebar
import Sidebar from '../Components/sidebar/Staff_Sidebar';

// Importing Navbar component for the top navigation bar
import Navbar from '../Components/navbar/Navbar';

// Importing StudentTable component to display student details
import StudentTable from '../Components/tables/StudentDetail';

// Define the ListOfStudents functional component
const ListOfStudents = () => {
  const navigate = useNavigate(); // Initialize navigate function from React Router
  const toastShownRef = useRef(false);

  useEffect(() => {
    const validateuser = async () => {
      const user = auth.currentUser;
      if (!user) {
        if (!toastShownRef.current) {
          toast.error("Not a valid user");
          toastShownRef.current = true;
          setTimeout(() => {
            navigate('/LoginAndRegister');
          }, 2500);
        }
      }
    };

    validateuser();
  }, [navigate]);

  return (
    <div className='listofstudent'>
      {/* Render ToastContainer for notifications */}
      {toastContainer}
      {/* Sidebar component for the navigation sidebar */}
      <Sidebar />

      <div className="listofstudentcontainer">
        {/* Navbar component for the top navigation bar */}
        <Navbar />

        <div className="tablecontainer">
          {/* Title for the list of students */}
          <div className="list-title">List Of Students, Enrolled...!</div>

          {/* StudentTable component to display the table of student details */}
          <StudentTable />
        </div>
      </div>
    </div>
  );
}

// Export the ListOfStudents component as the default export
export default ListOfStudents;
