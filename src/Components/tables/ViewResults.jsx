// Importing necessary dependencies and components from React and other libraries
import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid'; // Importing the DataGrid component for table display
import { db } from '../../firebase'; // Importing the configured Firestore instance
import { collection, getDocs } from 'firebase/firestore'; // Importing Firestore functions for data retrieval
import '../../SassyCSS/table.scss'; // Importing custom CSS for styling the table

// Function to fetch placement data from Firestore
const fetchPlacementData = async () => {
  // Get documents from 'PlacedStudents' collection
  const querySnapshot = await getDocs(collection(db, 'PlacedStudents'));
  // Map the documents to an array of data objects
  const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return data;
};

const ViewResults = () => {
  // State to store the fetched placement data
  const [placementData, setPlacementData] = useState([]);
  // State to manage the number of rows per page
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    // Function to fetch and set placement data
    const getData = async () => {
      const data = await fetchPlacementData();
      // Update state with the fetched data
      setPlacementData(data);
    };
    // Call the fetch function
    getData();
  }, []);

  // Define columns for the DataGrid
  const columns = [
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'department', headerName: 'Department', width: 300 },
    { field: 'company_name', headerName: 'Company', width: 300 },
    { field: 'job_role', headerName: 'Job Role', width: 200 },
  ];

  return (
    // Container for the DataGrid component
    <div className="table-container">
      <div style={{ height: 530, width: '100%' }}>
        {/* DataGrid component to display placement data */}
        <DataGrid
          rows={placementData}
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[10, 25, 50]}
          pagination
        />
      </div>
    </div>
  );
};

export default ViewResults;
