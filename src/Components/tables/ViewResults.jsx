// Importing necessary dependencies and components from React and other libraries
import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import '../../SassyCSS/table.scss'; // Importing custom CSS for styling the table

// Function to fetch placement data from Firestore
const fetchPlacementData = async () => {
  // Get documents from 'students' collection
  const querySnapshot = await getDocs(collection(db, 'students'));
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
    { field: 'department', headerName: 'Department', width: 200 },
    { field: 'company_name', headerName: 'Company', width: 200 },
    { field: 'job_role', headerName: 'Job Role', width: 200 },
    { field: 'valid_from', headerName: 'Valid From', width: 150 },
    { field: 'valid_to', headerName: 'Valid To', width: 150 },
    { field: 'link', headerName: 'Link', width: 200 },
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
          paginationModel={{ pageSize, page: 0 }}
        />
      </div>
    </div>
  );
};

export default ViewResults;
