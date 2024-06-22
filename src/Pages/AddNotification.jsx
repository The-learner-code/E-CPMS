// Importing the styles for the notification component
import '../SassyCSS/addnotification.scss';

// Importing the useNavigate hook from react-router-dom to handle navigation
import { useNavigate } from 'react-router-dom';

// Importing the Sidebar component which likely contains navigation links or other sidebar content
import Sidebar from '../Components/sidebar/Staff_Sidebar';

// Importing the Navbar component which likely contains the top navigation bar content
import Navbar from '../Components/navbar/Navbar';

// Importing CSS for react-toastify to style toast notifications
import 'react-toastify/dist/ReactToastify.css';

// Importing ToastContainer to render toast notifications and toast to trigger notifications
import { ToastContainer, toast } from 'react-toastify';

// Importing the Table component to display the notifications
import Table from '../Components/tables/Notification';

const AddNotification = () => {
  // useNavigate hook to programmatically navigate to different routes
  const navigate = useNavigate();

  return (
    <div className='notification'>
      {/* ToastContainer to display toast notifications with various settings */}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {/* Sidebar component for the navigation sidebar */}
      <Sidebar />

      <div className="notifycontainer">
        {/* Navbar component for the top navigation bar */}
        <Navbar />

        {/* Button to navigate to the message entry form */}
        <div className="addnotifybtn">
          <button onClick={() => navigate('/MsgEntryForm')}>Add New Message</button>
        </div>

        {/* Container for the list of notifications */}
        <div className="listcontainer">
          <div className="list-title">Latest Notification</div>
          {/* Table component to display the notifications */}
          <Table />
        </div>
      </div>
    </div>
  )
}

export default AddNotification;
