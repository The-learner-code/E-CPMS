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

// Async function to fetch tech support data from Firestore
const fetchTechSupportData = async () => {
  // Get all documents from the 'TechSupport' collection
  const querySnapshot = await getDocs(collection(db, 'TechSupport'));
  // Map through each document and extract the necessary fields
  const data = querySnapshot.docs.map(doc => ({
    id: doc.id,  // Document ID
    Email_id: doc.data().Email_id,  // Email ID field
    Registered_no: doc.data().Registered_no,  // Registered number field
    Message: doc.data().Message,  // Message field
    Timestamp: doc.data().Timestamp, //timestamp field
  }));
  return data;  // Return the formatted data
};

// React functional component to render tech support table
const TechSupportTable = () => {
  // State to hold the fetched tech support data
  const [techSupportData, setTechSupportData] = useState([]);
  // State to manage loading status
  const [loading, setLoading] = useState(true);

  // useEffect hook to fetch data when the component mounts
  useEffect(() => {
    const getData = async () => {
      const data = await fetchTechSupportData();  // Fetch data
      setTechSupportData(data);  // Update state with fetched data
      setLoading(false);  // Set loading to false after data is loaded
    };
    getData();  // Invoke the getData function
  }, []);  // Empty dependency array means this runs once on mount

  // Define columns for the DataGrid
  const columns = [
    { field: 'Email_id', headerName: 'Email', width: 300 },  // Email column
    { field: 'Registered_no', headerName: 'Registered Number', width: 220 },  // Registered number column
    { field: 'Message', headerName: 'Message', width: 400 },  // Message column
    { field: 'Timestamp', headerName: 'Timestamp (IST)', width: 250 },  // Timestamp column
  ];

  // Render the DataGrid component with the fetched data
  return (
    <div className="table-container">
      <div style={{ height: 530, width: '100%' }}>
        <DataGrid
          rows={techSupportData}  // Rows data
          columns={columns}  // Columns definition
          loading={loading}  // Loading state
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },  // Initial pagination settings
            },
          }}
          pageSizeOptions={[5, 10]}  // Options for page size
        />
      </div>
    </div>
  );
};

// Export the component as default
export default TechSupportTable;
