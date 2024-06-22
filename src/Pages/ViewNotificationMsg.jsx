import Sidebar from '../Components/sidebar/Stu_Sidebar';
import Navbar from '../Components/navbar/Navbar';
import Table from '../Components/tables/ViewNotification';
import '../SassyCSS/viewnotificationmsg.scss';

const ViewNotificationMsg = () => {

    return (
        <div className='notification'>
            <Sidebar />
            <div className="stunotificationcontainer">
                <Navbar />
                <div className="listcontainer">
                    <div className="list-title">Lastest Notification</div>
                    <Table />
                </div>
            </div>
        </div>
    );
};

export default ViewNotificationMsg;
