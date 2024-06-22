import '../SassyCSS/listofstudents.scss';
import Sidebar from '../Components/sidebar/Staff_Sidebar';
import Navbar from '../Components/navbar/Navbar';
import StudentTable from '../Components/tables/StudentDetail';

const ListOfStudents = () => {
  return (
    <div className='listofstudent'>
      <Sidebar />
      <div className="listofstudentcontainer">
        <Navbar />
        <div className="tablecontainer">
          <div className="list-title">List Of Students, Enrolled...!</div>
          <StudentTable />
        </div>
      </div>
    </div>
  );
}

export default ListOfStudents;
