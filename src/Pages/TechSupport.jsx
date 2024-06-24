// Import custom styles for the tech support component
import '../SassyCSS/techsupport.scss';
// Import the Sidebar component
import Sidebar from '../Components/sidebar/Admin_Sidebar';
// Import the Navbar component
import Navbar from '../Components/navbar/Navbar';
// Import the Table component to display tech support messages
import Table from '../Components/tables/TechSupport';

// React functional component to render the tech support messages
const TechSupport = () => {
  return (
    <div className='techsupport'>
      {/* Render the Sidebar component */}
      <Sidebar />
      <div className="techsupportcontainer">
        {/* Render the Navbar component */}
        <Navbar />
        <div className="listcontainer">
          <div className="list-title">Contact Us Messages</div>
          {/* Render the Table component to display tech support messages */}
          <Table />
        </div>
      </div>
    </div>
  );
};

// Export the component as default
export default TechSupport;
