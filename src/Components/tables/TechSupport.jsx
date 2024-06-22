import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import '../../SassyCSS/table.scss';

const fetchTechSupportData = async () => {
  const querySnapshot = await getDocs(collection(db, 'TechSupport'));
  const data = querySnapshot.docs.map(doc => ({
    id: doc.id,
    Email_id: doc.data().Email_id,
    Registered_no: doc.data().Registered_no,
    Message: doc.data().Message,
    Timestamp: doc.data().Timestamp.toDate().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }), // Convert Firestore Timestamp to Date and then format in IST
  }));
  return data;
};

const TechSupportTable = () => {
  const [techSupportData, setTechSupportData] = useState([]);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchTechSupportData();
      setTechSupportData(data);
    };
    getData();
  }, []);

  const columns = [
    { field: 'Email_id', headerName: 'Email', width: 300 },
    { field: 'Registered_no', headerName: 'Registered Number', width: 220 },
    { field: 'Message', headerName: 'Message', width: 400 },
    { field: 'Timestamp', headerName: 'Timestamp (IST)', width: 250 },
  ];

  return (
    <div className="table-container">
      <div style={{ height: 530, width: '100%' }}>
        <DataGrid
          rows={techSupportData}
          columns={columns}
          pageSize={pageSize}
          rowsPerPageOptions={[10, 25, 50]}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          pagination
        />
      </div>
    </div>
  );
};

export default TechSupportTable;
