import React, { useState, useEffect, useCallback } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { DataGrid } from '@mui/x-data-grid';
import { CircularProgress, Link } from '@mui/material';
import '../../SassyCSS/table.scss';

const StudentTable = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStudents = useCallback(async () => {
    setLoading(true);
    const studentsCollection = collection(db, "StudentsInformation");
    const studentsSnapshot = await getDocs(studentsCollection);
    const studentsList = studentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setStudents(studentsList);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const columns = [
    { field: 'Name', headerName: 'Name', width: 150 },
    { field: 'Register_No', headerName: 'Register No', width: 120 },
    { field: 'Email_id', headerName: 'Email ID', width: 200 },
    { field: 'Batch', headerName: 'Batch', width: 55 },
    { field: 'Department', headerName: 'Department', width: 100 },
    { field: 'Current_Semester', headerName: 'Semester', width: 80 },
    { field: 'Current_Cgpa', headerName: 'CGPA', width: 50 },
    { field: 'Placement', headerName: 'Placement', width: 100 },
    {
      field: 'Address',
      headerName: 'Address',
      width: 250, // Adjust the width of Address column as needed
      renderCell: (params) => (
        <div style={{ 
          whiteSpace: 'pre-wrap', 
          wordBreak: 'break-word', 
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          lineHeight: '1.2',  // Reduced line height
          padding: '4px 0'   // Adjust padding to fine-tune spacing
        }}>
          {params.value}
        </div>
      ),
    },
    { field: 'District', headerName: 'District', width: 130 },
    { field: 'State', headerName: 'State', width: 100 },
    { field: 'Pincode', headerName: 'Pincode', width: 80 },
    { field: 'Phone_No', headerName: 'Phone No', width: 120 },
    {
      field: 'Photo_URL',
      headerName: 'Photo',
      width: 100,
      renderCell: (params) => (
        <Link href={params.value} target="_blank" rel="noopener">
          View Photo
        </Link>
      ),
    },
    {
      field: 'Resume_URL',
      headerName: 'Resume',
      width: 120,
      renderCell: (params) => (
        <Link href={params.value} target="_blank" rel="noopener">
          View Resume
        </Link>
      ),
    },
  ];

  return (
    <div className="table-container">
      {loading ? <CircularProgress /> : (
        <div style={{ height: 550, width: '100%' }}>
          <DataGrid
            rows={students}
            columns={columns}
            getRowId={(row) => row.id}
            initialState={{
              pagination: {
                  paginationModel: { page: 0, pageSize: 10 }, // Initial pagination settings
              },
          }}
          pageSizeOptions={[5, 10, 20]} // Options for page size
          />
        </div>
      )}
    </div>
  );
};

export default StudentTable;
