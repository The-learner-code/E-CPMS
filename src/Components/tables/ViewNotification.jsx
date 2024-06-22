import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { DataGrid } from '@mui/x-data-grid';
import { toast, toastContainer } from '../../toastservice'; // Import ToastContainer and toast components from React Toastify
import '../../SassyCSS/table.scss';

const Tablenotify = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'Notification_Logs'));
                const notificationsList = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                    timestamp: doc.data().timestamp ? doc.data().timestamp : 'No timestamp available'
                }));
                setNotifications(notificationsList);
            } catch (error) {
                console.error("Error fetching notifications: ", error);
                toast.error('Failed to fetch notifications');
            } finally {
                setLoading(false);
            }
        };

        fetchNotifications();
    }, []);

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
        {
            field: 'link', headerName: 'Link', width: 200, renderCell: (params) => (
                <a href={params.value} target="_blank" rel="noopener noreferrer">
                    Link
                </a>
            )
        },
    ];

    return (
        <div className="table-container">
            {toastContainer}
            <div style={{ height: 520, width: '100%' }}>
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
