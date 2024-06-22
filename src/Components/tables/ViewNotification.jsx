// Importing necessary dependencies and components from React and other libraries
import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore'; // Importing Firestore functions for data retrieval
import { db } from '../../firebase';  // Importing the configured Firestore instance
import { DataGrid } from '@mui/x-data-grid'; // Importing the DataGrid component for table display
import '../../SassyCSS/table.scss'; // Importing custom CSS for styling the table

const Tablenotify = () => {
    // State to store the fetched notifications
    const [notifications, setNotifications] = useState([]);
    // State to manage loading status
    const [loading, setLoading] = useState(true);
    // State to manage the number of rows per page
    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        // Function to fetch notifications from Firestore
        const fetchNotifications = async () => {
            try {
                // Get documents from 'Notification_Log' collection
                const querySnapshot = await getDocs(collection(db, 'Notification_Log'));
                const notificationsList = [];
                // Iterate over each document and extract data
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    // Use timestamp field directly as a string, default to 'No timestamp available' if not present
                    const timestamp = data.timestamp ? data.timestamp : 'No timestamp available';
                    // Push the notification data to the list
                    notificationsList.push({ id: doc.id, type: data.type, content: data.content, timestamp });
                });
                // Update state with the fetched notifications
                setNotifications(notificationsList);
            } catch (error) {
                // Log any errors encountered during fetch
                console.error("Error fetching notifications: ", error);
            } finally {
                // Set loading to false after fetch attempt (success or failure)
                setLoading(false);
            }
        };

        // Call the fetch function
        fetchNotifications();
    }, []);

    // Define columns for the DataGrid
    const columns = [
        { field: 'timestamp', headerName: 'Timestamp', width: 200 },
        { field: 'type', headerName: 'Type', width: 100 },
        {
            field: 'content', headerName: 'Content', width: 750, renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }} title={params.value}>
                    {params.value}
                </div>
            )
        },
        { field: 'valid_from', headerName: 'Valid From', width: 150 },
        { field: 'valid_to', headerName: 'Valid To', width: 150 },
        { field: 'link', headerName: 'Link', width: 200 },
    ];

    return (
        // Container for the DataGrid component
        <div className="table-container">
            <div style={{ height: 520, width: '100%' }}>
                {/* DataGrid component to display notifications */}
                <DataGrid
                    rows={notifications}
                    columns={columns}
                    pageSize={pageSize}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    rowsPerPageOptions={[10, 25, 50]}
                    pagination
                    paginationModel={{ pageSize, page: 0 }}
                    loading={loading}
                />
            </div>
        </div>
    );
};

export default Tablenotify;

