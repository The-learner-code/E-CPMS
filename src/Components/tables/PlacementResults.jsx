import React, { useState, useEffect } from 'react';  // Import React, useState, and useEffect from React library
import { DataGrid } from '@mui/x-data-grid';  // Import DataGrid component from Material-UI X package
import { db } from '../../firebase';  // Import db from Firebase
import { collection, getDocs } from 'firebase/firestore';  // Import collection and getDocs from Firestore
import '../../SassyCSS/table.scss';  // Import custom CSS styles for table

// Function to fetch placement data from Firestore
const fetchPlacementData = async () => {
    const querySnapshot = await getDocs(collection(db, 'PlacedStudents'));  // Query 'PlacedStudents' collection
    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));  // Map query snapshot to array of objects
    return data;  // Return formatted data
};

const PlacementResults = () => {
    const [placementData, setPlacementData] = useState([]);  // State for placement data
    const [loading, setLoading] = useState(true);  // State for loading status

    useEffect(() => {
        const getData = async () => {
            const data = await fetchPlacementData();  // Fetch placement data
            setPlacementData(data);
            setLoading(false);  // Set placement data in state
        };
        getData();  // Call getData function on component mount
    }, []);  // Empty dependency array ensures useEffect runs only once

    // Define columns for DataGrid component
    const columns = [
        { field: 'email', headerName: 'Email', width: 250 },
        { field: 'department', headerName: 'Department', width: 300 },
        { field: 'company_name', headerName: 'Company', width: 300 },
        { field: 'job_role', headerName: 'Job Role', width: 200 },
    ];

    return (
        <div className="table-container">
            <div style={{ height: 480, width: '100%' }}>
                {/* Render DataGrid with placementData and columns */}
                <DataGrid
                    rows={placementData}
                    columns={columns}
                    loading={loading}
                    initialState={{
                        pagination: {
                          paginationModel: { page: 0, pageSize: 10 },
                        },
                      }}
                      pageSizeOptions={[5, 10, 20]}
                />
            </div>
        </div >
    );
};

export default PlacementResults;  // Export PlacementResults component as default
