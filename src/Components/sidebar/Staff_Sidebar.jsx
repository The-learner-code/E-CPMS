import React from 'react';  // Import React library
import { useNavigate } from 'react-router-dom';  // Import useNavigate hook from React Router
import { auth } from "../../firebase";  // Import 'auth' object from Firebase
import '../../SassyCSS/sidebar.scss';  // Import styles for the sidebar component
import InfoIcon from '@mui/icons-material/Info';  // Import InfoIcon from Material-UI icons
import GradingIcon from '@mui/icons-material/Grading';  // Import AssignmentTurnedInIcon from Material-UI icons
import NotificationAddIcon from '@mui/icons-material/NotificationAdd';  // Import NotificationAddIcon from Material-UI icons
import BarChartIcon from '@mui/icons-material/BarChart';
import PieChartIcon from '@mui/icons-material/PieChart';
import LogoutIcon from '@mui/icons-material/Logout';  // Import LogoutIcon from Material-UI icons
import { signOut } from "firebase/auth";  // Import signOut function from Firebase auth
import { toast, toastContainer } from '../../toastservice'; // Import ToastContainer and toast components from React Toastify

const Stu_Sidebar = () => {  // Define Stu_Sidebar functional component
    const navigate = useNavigate();  // Initialize navigate function from React Router

    const handleLogout = async () => {  // Define handleLogout function to handle user logout
        try {
            await signOut(auth);  // Call signOut function from Firebase auth to sign out user
            toast.success("Logged out successfully!");  // Show success toast message
            setTimeout(() => {
                navigate('/');  // Redirect user to Home page after 2 seconds
            }, 2500);
        } catch (error) {
            toast.error("Error logging out. Please try again.");  // Show error toast message
        }
    };

    return (
        <div className="sidebar">  {/* Render sidebar container */}
            {toastContainer}  {/* Render ToastContainer for notifications */}
            <div className="top">  {/* Render top section of sidebar */}
                <span className="logo">PlacementPulse</span>  {/* Render logo text */}
            </div>
            <hr />  {/* Render horizontal line */}
            <div className="center">  {/* Render center section of sidebar */}
                <ul>  {/* Render unordered list */}
                    <li onClick={() => navigate('/ListOfStudents')}>  {/* Render list item for Student Details with click event to navigate */}
                        <InfoIcon className='icon' />  {/* Render AccountBoxIcon with CSS class 'icon' */}
                        <span>Student Details</span>  {/* Render text 'Student Details' */}
                    </li>
                    <li onClick={() => navigate('/AddPlacementResults')}>  {/* Render list item for placement result page with click event to navigate */}
                        <GradingIcon className='icon' />  {/* Render GradingIcon with CSS class 'icon' */}
                        <span>Add Result</span>  {/* Render text 'Update Result' */}
                    </li>
                    <li onClick={() => navigate('/AddNotification')}>  {/* Render list item for notification page with click event to navigate */}
                        <NotificationAddIcon className='icon' />  {/* Render NotificationsIcon with CSS class 'icon' */}
                        <span>Notification</span>  {/* Render text 'Update Notifications' */}
                    </li>
                    <li onClick={() => navigate('/Analysis')}>  {/* Render list item for notification page with click event to navigate */}
                        <BarChartIcon className='icon' />  {/* Render BarChartIcon with CSS class 'icon' */}
                        <span>Placement's Report</span>  {/* Render text 'Analysis Page' */}
                    </li>
                    <li onClick={() => navigate('/ComAnalysis')}>  {/* Render list item for notification page with click event to navigate */}
                        <PieChartIcon className='icon' />  {/* Render PieChartIcon with CSS class 'icon' */}
                        <span>Company's Report</span>  {/* Render text 'Analysis Page' */}
                    </li>

                </ul>
            </div>
            <div className="bottom">  {/* Render bottom section of sidebar */}
                <ul>  {/* Render unordered list */}
                    <li onClick={handleLogout}>  {/* Render list item for logout with click event to handle logout */}
                        <LogoutIcon className='icon' />  {/* Render LogoutIcon with CSS class 'icon' */}
                        <span>Logout</span>  {/* Render text 'Logout' */}
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Stu_Sidebar;  // Export Stu_Sidebar component as default export
