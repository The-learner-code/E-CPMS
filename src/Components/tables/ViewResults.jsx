import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import '../../SassyCSS/table.scss';

const fetchPlacementData = async () => {
  const querySnapshot = await getDocs(collection(db, 'students'));
  const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return data;
};

const ViewResults = () => {
  const [placementData, setPlacementData] = useState([]);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchPlacementData();
      setPlacementData(data);
    };
    getData();
  }, []);

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
    <div className="table-container">
      <div style={{ height: 530, width: '100%' }}>
        <DataGrid
          rows={placementData}
          columns={columns}
          pageSize={pageSize}
          rowsPerPageOptions={[10, 25, 50]}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          pagination
        />
      </div>
    </div >
  );
};

export default ViewResults;
