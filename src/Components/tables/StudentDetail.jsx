// Importing necessary hooks and components from React and other libraries
import { useState, useEffect } from 'react';
import { collection, getDocs } from "firebase/firestore"; // Importing Firestore functions for data retrieval
import { db } from "../../firebase"; // Importing the configured Firestore instance
import { DataGrid } from '@mui/x-data-grid'; // Importing the DataGrid component for table display
import { CircularProgress, Link } from '@mui/material'; // Importing Material-UI components for progress indicator and links
import '../../SassyCSS/table.scss'; // Importing custom CSS for styling the table

const StudentTable = () => {

  // State to store the fetched students
  const [students, setStudents] = useState([]);
  // State to manage loading status
  const [loading, setLoading] = useState(true);
  // State to manage the number of rows per page
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    // Function to fetch student data from Firestore
    const fetchStudents = async () => {
      const studentsCollection = collection(db, "StudentsInformation");
      const studentsSnapshot = await getDocs(studentsCollection);
      // Map the documents to an array of student data objects
      const studentsList = studentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      // Update state with the fetched students
      setStudents(studentsList);
      // Set loading to false after data is fetched
      setLoading(false);
    };

    // Call the fetch function
    fetchStudents();
  }, []);

  // Define columns for the DataGrid
  const columns = [
    { field: 'Name', headerName: 'Name', width: 150 },
    { field: 'Register_No', headerName: 'Register No', width: 120 },
    { field: 'Email_id', headerName: 'Email ID', width: 200 },
    { field: 'Batch', headerName: 'Batch', width: 55 },
    { field: 'Department', headerName: 'Department', width: 90 },
    { field: 'Current_Semester', headerName: 'Semester', width: 75 },
    { field: 'Current_Cgpa', headerName: 'CGPA', width: 50 },
    { field: 'Placement', headerName: 'Placement', width: 80 },
    { field: 'Address', headerName: 'Address', width: 180 },
    { field: 'District', headerName: 'District', width: 100 },
    { field: 'State', headerName: 'State', width: 90 },
    { field: 'Pincode', headerName: 'Pincode', width: 80 },
    { field: 'Phone_No', headerName: 'Phone No', width: 120 },
    {
      field: 'Photo_URL',
      headerName: 'Photo',
      width: 100,
      renderCell: (params) => (
        // Render a clickable link to view the photo
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
        // Render a clickable link to view the resume
        <Link href={params.value} target="_blank" rel="noopener">
          View Resume
        </Link>
      ),
    },
  ];

  return (
    // Container for the DataGrid component
    <div className="table-container">
      {loading ? <CircularProgress /> : (
        <div style={{ height: 550, width: '100%' }}>
          {/* DataGrid component to display student data */}
          <DataGrid
            rows={students}
            columns={columns}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[10, 25, 50]}
            pagination
            paginationModel={{ pageSize, page: 0 }}
          />
        </div>
      )}
    </div>
  );
}

export default StudentTable;
