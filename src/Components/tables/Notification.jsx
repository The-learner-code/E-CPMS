import React, { useState, useEffect } from 'react';  // Import React, useState, and useEffect from React library
import { collection, getDocs } from 'firebase/firestore';  // Import collection and getDocs from Firestore
import { db } from '../../firebase'; // Ensure this path matches your project structure
import { DataGrid } from '@mui/x-data-grid';  // Import DataGrid component from Material-UI X package
import '../../SassyCSS/table.scss';  // Import custom CSS styles for table

const Tablenotify = () => {
    const [notifications, setNotifications] = useState([]);  // State for notifications data
    const [loading, setLoading] = useState(true);  // State for loading status

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                // Query Firestore collection 'Notification_Logs'
                const querySnapshot = await getDocs(collection(db, 'Notification_Logs'));
                const notificationsList = [];
                // Iterate through query snapshot and map data to notificationsList array
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    // Use timestamp field directly as a string
                    const timestamp = data.timestamp ? data.timestamp : 'No timestamp available';
                    notificationsList.push({
                        id: doc.id,
                        type: data.type,
                        content: data.content,
                        timestamp,
                        valid_from: data.valid_from,
                        valid_to: data.valid_to,
                        link: data.link,
                        status: 'Added'
                    });
                });
                setNotifications(notificationsList);  // Update notifications state with fetched data
            } catch (error) {
                console.error("Error fetching notifications: ", error);
                // Update notifications state to mark failed notifications
                setNotifications((prevNotifications) => prevNotifications.map(notification => ({ ...notification, status: 'Failed' })));
            } finally {
                setLoading(false);  // Set loading state to false after fetching
            }
        };

        fetchNotifications();  // Call fetchNotifications function on component mount
    }, []);  // Empty dependency array ensures useEffect runs only once

    // Define columns for DataGrid component
    const columns = [
        { field: 'timestamp', headerName: 'Timestamp', width: 200 },
        { field: 'type', headerName: 'Type', width: 100 },
        { field: 'content', headerName: 'Content', width: 750, renderCell: (params) => (
            <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }} title={params.value}>
                {params.value}
            </div>
        )},
        { field: 'valid_from', headerName: 'Valid From', width: 150 },
        { field: 'valid_to', headerName: 'Valid To', width: 150 },
        { field: 'link', headerName: 'Link', width: 200, renderCell: (params) => (
            <a href={params.value} target="_blank" rel="noopener noreferrer">
                Link
            </a>
        )},
        { field: 'status', headerName: 'Status', width: 100, renderCell: (params) => (
            <div className={`status ${params.value.toLowerCase()}`}>
                {params.value}
            </div>
        )}
    ];

    return (
        <div className="table-container">
            <div style={{ height: 450, width: '100%' }}>
                {/* Render DataGrid with notifications data */}
                <DataGrid 
                    rows={notifications} 
                    columns={columns} 
                    pageSize={5} 
                    loading={loading}
                />
            </div>
        </div>
    );
};

export default Tablenotify;  // Export Tablenotify component as default
