// Import necessary modules from React
import React, { useState, useEffect, useRef } from 'react';
// Import DataGrid component from Material-UI
import { DataGrid } from '@mui/x-data-grid';
// Import Firestore database instance from firebase configuration
import { db, auth } from '../../firebase';
// Import Firestore collection and getDocs functions
import { collection, getDocs } from 'firebase/firestore';
// Import custom styles for the table component
import '../../SassyCSS/table.scss';
// Import toast and ToastContainer from your toast service
import { toast, toastContainer } from '../../toastservice'; // Correct import for ToastContainer
// Import useNavigate from react-router-dom
import { useNavigate } from 'react-router-dom';

// React functional component to render user credentials table
const UserCredTable = () => {
  const navigate = useNavigate();
  const toastShownRef = useRef(false);

  const [userCredData, setUserCredData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const querySnapshot = await getDocs(collection(db, 'AuthDetails')); // Get all documents from the 'AuthDetails' collection
          const data = querySnapshot.docs.map(doc => { // Map through each document
            const docData = doc.data(); // Extract the document data
            return {
              id: doc.id, // Document ID
              email: docData.email, // Email field
              created: docData.created, // Created field
              signedIn: docData.signedIn, // Signed In field
              uid: docData.uid, // User UID field
              password: docData.password, // Password field
              type: docData.type // Type field
            };
          });
          setUserCredData(data); // Update state with fetched data
          setLoading(false); // Set loading to false after data is loaded
        } catch (error) {
          console.error("Error fetching user credentials:", error);
          toast.error("Failed to load data");
          setLoading(false);
        }
      } else {
        if (!toastShownRef.current) {
          console.log("Not a valid user, showing toast");
          toast.error("Not a valid user");
          toastShownRef.current = true;

        }
      }
    };

    fetchProfileData();
  }, [navigate]);

  const columns = [
    { field: 'email', headerName: 'Email', width: 300 }, // Email column
    { field: 'created', headerName: 'Created', width: 220 }, // Created column
    { field: 'signedIn', headerName: 'Signed In', width: 220 }, // Signed In column
    { field: 'uid', headerName: 'User UID', width: 300 }, // User UID column
    { field: 'type', headerName: 'Type', width: 100 }, // Type column
  ];

  return (
    <div className="table-container">
      {/* Render ToastContainer for notifications */}
      {toastContainer}
      <div style={{ height: 530, width: '100%' }}>
        <DataGrid
          rows={userCredData} // Rows data
          columns={columns} // Columns definition
          loading={loading} // Loading state
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 }, // Initial pagination settings
            },
          }}
          pageSizeOptions={[5, 10]} // Options for page size
        />
      </div>
    </div>
  );
};

// Export the component as default
export default UserCredTable;
