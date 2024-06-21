import React, { useState, useEffect } from 'react';  // Import React, useState, and useEffect from React library
import { useNavigate } from 'react-router-dom';  // Import useNavigate hook from React Router
import { auth, db } from "../firebase";  // Import auth and db from Firebase
import { doc, getDoc } from "firebase/firestore";  // Import doc and getDoc from Firestore
import { ToastContainer, toast } from 'react-toastify';  // Import ToastContainer and toast from react-toastify
import Sidebar from '../Components/sidebar/Stu_Sidebar';  // Import Sidebar component
import Navbar from '../Components/navbar/Navbar';  // Import Navbar component
import 'react-toastify/dist/ReactToastify.css';  // Import styles for Toastify
import '../SassyCSS/viewprofile.scss';  // Import styles for view profile page

const ViewProfile = () => {  // Define ViewProfile functional component
  const navigate = useNavigate();  // Initialize navigate function from React Router
  const [profileData, setProfileData] = useState(null);  // Initialize state for profile data

   useEffect(() => {
      const fetchProfileData = async () => {
          const user = auth.currentUser;
          if (user) {
              const docRef = doc(db, "StudentsInformation", user.email);
              const docSnap = await getDoc(docRef);
              if (docSnap.exists()) {
                  setProfileData(docSnap.data());
              } else {
                  toast.warn("No data found. Redirecting to update profile page...");
                  setTimeout(() => {
                      navigate('/UpdateProfile');
                  }, 3000);
              }
          } else {
              toast.error("Not a valid user");
              setTimeout(() => {
                  navigate('/LoginAndRegister');
              }, 3000);
          }
      };

      fetchProfileData();
  }, [navigate]); 

  return (
    <div className='profile'>
      {/* Render ToastContainer for notifications */}
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <Sidebar />  {/* Render sidebar */}
      <div className="profilecontainer">
        <Navbar />  {/* Render Navbar */}
        <div className="updateprofilebtn">
          <button onClick={() => navigate('/UpdateProfile')}>Update Your Profile</button>  {/* Button to update profile */}
        </div>
        <div className="bottom">
          <div className="left">
            {/* Render profile photo */}
            <img
              src={
                profileData?.Photo_URL ||
                "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt="Profile"
            />
          </div>

          <div className="right">
            <form>
              {/* Render form inputs */}
              {/* Display profile information */}
              <div className="forminput">
                <label>Register Number :</label>
                <span>{profileData?.Register_No || "N/A"}</span>
              </div>
              <div className="forminput">
                <label>Name and Surname :</label>
                <span>{profileData?.Name || "N/A"}</span>
              </div>
              <div className="forminput">
                <label>Resume :</label>
                {profileData?.Resume_URL ? (
                  <a href={profileData?.Resume_URL} target="_blank" rel="noopener noreferrer">View Resume</a>
                ) : (
                  <span>No resume uploaded</span>
                )}
              </div>
              {/* Other profile details */}
              <div className="forminput">
                <label>Batch :</label>
                <span>{profileData?.Batch || "N/A"}</span>
              </div>
              <div className="forminput">
                <label>Department :</label>
                <span>{profileData?.Department || "N/A"}</span>
              </div>
              <div className="forminput">
                <label>Semester :</label>
                <span>{profileData?.Current_Semester || "N/A"}</span>
              </div>
              <div className="forminput">
                <label>Current CGPA :</label>
                <span>{profileData?.Current_Cgpa || "N/A"}</span>
              </div>
              <div className="forminput">
                <label>Address :</label>
                <span>{profileData?.Address || "N/A"}</span>
              </div>
              <div className="forminput">
                <label>District :</label>
                <span>{profileData?.District || "N/A"}</span>
              </div>
              <div className="forminput">
                <label>State :</label>
                <span>{profileData?.State || "N/A"}</span>
              </div>
              <div className="forminput">
                <label>Pincode :</label>
                <span>{profileData?.Pincode || "N/A"}</span>
              </div>
              <div className="forminput">
                <label>Phone Number :</label>
                <span>{profileData?.Phone_No || "N/A"}</span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;  // Export ViewProfile component as default
