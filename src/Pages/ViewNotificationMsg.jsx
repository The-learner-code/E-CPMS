import Sidebar from '../Components/sidebar/Stu_Sidebar'; // Sidebar component import
import Navbar from '../Components/navbar/Navbar'; // Navbar component import
import Table from '../Components/tables/ViewNotification'; // Table component import for notifications
import '../SassyCSS/viewnotificationmsg.scss'; // Custom CSS styles

const ViewNotificationMsg = () => {

    return (
        <div className='notification'>
            {/* Sidebar component */}
            <Sidebar />
            
            <div className="stunotificationcontainer">
                {/* Navbar component */}
                <Navbar />
                
                <div className="listcontainer">
                    <div className="list-title">Lastest Notification</div>
                    
                    {/* Table component for displaying notifications */}
                    <Table />
                </div>
            </div>
        </div>
    );
};

export default ViewNotificationMsg;
