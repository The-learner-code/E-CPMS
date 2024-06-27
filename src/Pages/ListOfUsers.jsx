import React, { useEffect, useRef } from 'react';  // Import React, useState, and useEffect from React library
import { useNavigate } from 'react-router-dom';  // Import useNavigate hook from React Router
import { auth } from "../firebase";  // Import auth and db from Firebase
import { toast, toastContainer } from '../toastservice'; // Import ToastContainer and toast from react-toastify
// Import custom styles for the list of users component
import '../SassyCSS/listofusers.scss';
// Import the Sidebar component
import Sidebar from '../Components/sidebar/Admin_Sidebar';
// Import the Navbar component
import Navbar from '../Components/navbar/Navbar';
// Import the Table component to display user credentials
import Table from '../Components/tables/UserCred';

// React functional component to render the list of users with credentials
const ListOfUsers = () => {
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
    <div className='usercred'>
      {/* Render ToastContainer for notifications */}
      {toastContainer}
      {/* Render the Sidebar component */}
      <Sidebar />
      <div className="usercredcontainer">
        {/* Render the Navbar component */}
        <Navbar />
        <div className="listcontainer">
          <div className="list-title">Credentials...!</div>
          {/* Render the Table component to display user credentials */}
          <Table />
        </div>
      </div>
    </div>
  );
};

// Export the component as default
export default ListOfUsers;
