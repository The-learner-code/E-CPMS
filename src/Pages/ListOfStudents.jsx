// Importing styles for the list of students component
import '../SassyCSS/listofstudents.scss';

// Importing Sidebar component for the navigation sidebar
import Sidebar from '../Components/sidebar/Staff_Sidebar';

// Importing Navbar component for the top navigation bar
import Navbar from '../Components/navbar/Navbar';

// Importing StudentTable component to display student details
import StudentTable from '../Components/tables/StudentDetail';

// Define the ListOfStudents functional component
const ListOfStudents = () => {
  return (
    <div className='listofstudent'>
      {/* Sidebar component for the navigation sidebar */}
      <Sidebar />
      
      <div className="listofstudentcontainer">
        {/* Navbar component for the top navigation bar */}
        <Navbar />
        
        <div className="tablecontainer">
          {/* Title for the list of students */}
          <div className="list-title">List Of Students, Enrolled...!</div>
          
          {/* StudentTable component to display the table of student details */}
          <StudentTable />
        </div>
      </div>
    </div>
  );
}

// Export the ListOfStudents component as the default export
export default ListOfStudents;
