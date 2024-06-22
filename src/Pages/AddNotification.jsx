import '../SassyCSS/addnotification.scss';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Components/sidebar/Staff_Sidebar';
import Navbar from '../Components/navbar/Navbar';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import Table from '../Components/tables/Notification';

const AddNotification = () => {
  const navigate = useNavigate();
  return (
    <div className='notification'>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <Sidebar />
      <div className="notifycontainer">
        <Navbar />
        <div className="addnotifybtn">
          <button onClick={() => navigate('/MsgEntryForm')}>Add New Message</button>
        </div>
        <div className="listcontainer">
          <div className="list-title">Lastest Notification</div>
          <Table />
        </div>
      </div>
    </div>
  )
}

export default AddNotification