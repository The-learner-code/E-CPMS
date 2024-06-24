// Import necessary modules from React
import React, { useState, useEffect } from 'react';
// Import Firestore functions to access collections and documents
import { collection, getDocs } from 'firebase/firestore';
// Import Firestore database instance from firebase configuration
import { db } from '../../firebase';
// Import DataGrid component from Material-UI for creating a data table
import { DataGrid } from '@mui/x-data-grid';
// Import toast and ToastContainer for notification messages
import { toast, toastContainer } from '../../toastservice';
// Import custom styles for the table component
import '../../SassyCSS/table.scss';

// React functional component to render the notification table
const Tablenotify = () => {
    // State to hold the fetched notifications data
    const [notifications, setNotifications] = useState([]);
    // State to manage loading status
    const [loading, setLoading] = useState(true);

    // useEffect hook to fetch data when the component mounts
    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                // Get all documents from the 'Notification_Logs' collection
                const querySnapshot = await getDocs(collection(db, 'Notification_Logs'));
                // Map through each document and extract necessary fields
                const notificationsList = querySnapshot.docs.map(doc => ({
                    id: doc.id, // Document ID
                    ...doc.data(), // Spread the document data
                    timestamp: doc.data().timestamp ? doc.data().timestamp : 'No timestamp available' // Handle missing timestamp
                }));
                // Update state with fetched data
                setNotifications(notificationsList);
            } catch (error) {
                console.error("Error fetching notifications: ", error); // Log any errors
                toast.error('Failed to fetch notifications'); // Display error toast
            } finally {
                setLoading(false); // Set loading to false after data is loaded
            }
        };

        fetchNotifications(); // Invoke the fetchNotifications function
    }, []); // Empty dependency array means this runs once on mount

    // Define columns for the DataGrid
    const columns = [
        { field: 'timestamp', headerName: 'Timestamp', width: 200 }, // Timestamp column
        { field: 'type', headerName: 'Type', width: 100 }, // Type column
        {
            field: 'content', headerName: 'Content', width: 750, renderCell: (params) => (
                // Content column with word wrapping and tooltip
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }} title={params.value}>
                    {params.value}
                </div>
            )
        },
        { field: 'valid_from', headerName: 'Valid From', width: 150 }, // Valid From column
        { field: 'valid_to', headerName: 'Valid To', width: 150 }, // Valid To column
        {
            field: 'link', headerName: 'Link', width: 200, renderCell: (params) => (
                // Link column with clickable links
                <a href={params.value} target="_blank" rel="noopener noreferrer">
                    Link
                </a>
            )
        },
    ];

    // Render the DataGrid component with the fetched data
    return (
        <div className="table-container">
            {toastContainer} {/* Render the ToastContainer for displaying toast notifications */}
            <div style={{ height: 520, width: '100%' }}>
                <DataGrid
                    rows={notifications} // Rows data
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
export default Tablenotify;
