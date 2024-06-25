// Import necessary modules from React
import React, { useState, useEffect } from 'react';
// Import DataGrid component from Material-UI
import { DataGrid } from '@mui/x-data-grid';
// Import Firestore database instance from firebase configuration
import { db } from '../../firebase';
// Import Firestore collection and getDocs functions
import { collection, getDocs } from 'firebase/firestore';
// Import custom styles for the table component
import '../../SassyCSS/table.scss';

// Async function to fetch user credential data from Firestore
const fetchUserCredData = async () => {
  const querySnapshot = await getDocs(collection(db, 'AuthDetails')); // Get all documents from the 'AuthDetails' collection
  const data = querySnapshot.docs.map(doc => { // Map through each document
    const docData = doc.data(); // Extract the document data
    return {
      id: doc.id, // Document ID
      email: docData.email, // Email field
      //created: convertToIST(docData.created), // Convert and format the 'created' field to IST
      //signedIn: convertToIST(docData.signedIn), // Convert and format the 'signedIn' field to IST
      created: docData.created, // Convert and format the 'created' field to IST
      signedIn: docData.signedIn, // Convert and format the 'signedIn' field to IST
      uid: docData.uid, // User UID field
      password: docData.password, // Password field
      type: docData.type // Type field
    };
  });
  return data; // Return the formatted data
};

// React functional component to render user credentials table
const UserCredTable = () => {
  // State to hold the fetched user credentials data
  const [userCredData, setUserCredData] = useState([]);
  // State to manage loading status
  const [loading, setLoading] = useState(true);

  // useEffect hook to fetch data when the component mounts
  useEffect(() => {
    const getData = async () => {
      const data = await fetchUserCredData(); // Fetch data
      setUserCredData(data); // Update state with fetched data
      setLoading(false); // Set loading to false after data is loaded
    };
    getData(); // Invoke the getData function
  }, []); // Empty dependency array means this runs once on mount

  // Define columns for the DataGrid
  const columns = [
    { field: 'email', headerName: 'Email', width: 300 }, // Email column
    { field: 'created', headerName: 'Created', width: 220 }, // Created column
    { field: 'signedIn', headerName: 'Signed In', width: 220 }, // Signed In column
    { field: 'uid', headerName: 'User UID', width: 300 }, // User UID column
    { field: 'type', headerName: 'Type', width: 100 }, // Type column
  ];

  // Render the DataGrid component with the fetched data
  return (
    <div className="table-container">
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
