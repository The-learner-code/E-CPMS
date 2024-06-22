import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import '../../SassyCSS/table.scss';

// Function to convert UTC time to IST
const convertToIST = (utcDateString) => {
  const utcDate = new Date(utcDateString);
  const offsetIST = 5.5 * 60 * 60 * 1000; // IST offset in milliseconds
  const istDate = new Date(utcDate.getTime() + offsetIST);
  return istDate.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
};

const fetchUserCredData = async () => {
  const querySnapshot = await getDocs(collection(db, 'AuthDetails'));
  const data = querySnapshot.docs.map(doc => {
    const docData = doc.data();
    return {
      id: doc.id,
      email: docData.email,
      created: convertToIST(docData.created),
      signedIn: convertToIST(docData.signedIn),
      uid: docData.uid,
      password: docData.password,
      type: docData.type
    };
  });
  return data;
};

const UserCredTable = () => {
  const [userCredData, setUserCredData] = useState([]);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchUserCredData();
      setUserCredData(data);
    };
    getData();
  }, []);

  const columns = [
    { field: 'email', headerName: 'Email', width: 300 },
    { field: 'created', headerName: 'Created', width: 220 },
    { field: 'signedIn', headerName: 'Signed In', width: 220 },
    { field: 'uid', headerName: 'User UID', width: 300 },
    { field: 'type', headerName: 'Type', width: 100 },
  ];

  return (
    <div className="table-container">
      <div style={{ height: 530, width: '100%' }}>
        <DataGrid
          rows={userCredData}
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

export default UserCredTable;
