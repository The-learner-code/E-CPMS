// Import custom styles for the list of users component
import '../SassyCSS/listofusers.scss';
// Import the Sidebar component
import Sidebar from '../Components/sidebar/Admin_Sidebar';
// Import the Navbar component
import Navbar from '../Components/navbar/Navbar';
// Import the Table component to display user credentials
import Table from '../Components/tables/UserCred';

// React functional component to render the list of users with credentials
const ListOfUsers = () => {
  return (
    <div className='usercred'>
      {/* Render the Sidebar component */}
      <Sidebar />
      <div className="usercredcontainer">
        {/* Render the Navbar component */}
        <Navbar />
        <div className="listcontainer">
          <div className="list-title">Credentials...!</div>
          {/* Render the Table component to display user credentials */}
          <Table />
        </div>
      </div>
    </div>
  );
};

// Export the component as default
export default ListOfUsers;
