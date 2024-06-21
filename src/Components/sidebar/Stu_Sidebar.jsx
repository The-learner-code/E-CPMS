import React from 'react';  // Import React library
import { useNavigate } from 'react-router-dom';  // Import useNavigate hook from React Router
import { auth } from "../../firebase";  // Import 'auth' object from Firebase
import './sidebar.scss';  // Import styles for the sidebar component
import AccountBoxIcon from '@mui/icons-material/AccountBox';  // Import AccountBoxIcon from Material-UI icons
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';  // Import AssignmentTurnedInIcon from Material-UI icons
import NotificationsIcon from '@mui/icons-material/Notifications';  // Import NotificationsIcon from Material-UI icons
import LogoutIcon from '@mui/icons-material/Logout';  // Import LogoutIcon from Material-UI icons
import { signOut } from "firebase/auth";  // Import signOut function from Firebase auth
import { ToastContainer, toast } from 'react-toastify';  // Import ToastContainer and toast components from React Toastify
import 'react-toastify/dist/ReactToastify.css';  // Import styles for React Toastify

const Stu_Sidebar = () => {  // Define Stu_Sidebar functional component
    const navigate = useNavigate();  // Initialize navigate function from React Router

    const handleLogout = async () => {  // Define handleLogout function to handle user logout
        try {
            await signOut(auth);  // Call signOut function from Firebase auth to sign out user
            toast.success("Logged out successfully!");  // Show success toast message
            setTimeout(() => {
                navigate('/');  // Redirect user to Home page after 2 seconds
            }, 2000);
        } catch (error) {
            toast.error("Error logging out. Please try again.");  // Show error toast message
        }
    };

    return (
        <div className="sidebar">  {/* Render sidebar container */}
            <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />  {/* Render ToastContainer for notifications */}
            <div className="top">  {/* Render top section of sidebar */}
                <span className="logo">PlacementPluse</span>  {/* Render logo text */}
            </div>
            <hr />  {/* Render horizontal line */}
            <div className="center">  {/* Render center section of sidebar */}
                <ul>  {/* Render unordered list */}
                    <li onClick={() => navigate('/ViewProfile')}>  {/* Render list item for profile page with click event to navigate */}
                        <AccountBoxIcon className='icon' />  {/* Render AccountBoxIcon with CSS class 'icon' */}
                        <span>Profile</span>  {/* Render text 'Profile' */}
                    </li>
                    <li onClick={() => navigate('/ViewPlacementResults')}>  {/* Render list item for placement result page with click event to navigate */}
                        <AssignmentTurnedInIcon className='icon' />  {/* Render AssignmentTurnedInIcon with CSS class 'icon' */}
                        <span>Placement Result</span>  {/* Render text 'Placement Result' */} 
                    </li>
                    <li onClick={() => navigate('/StuNotificationpage')}>  {/* Render list item for notification page with click event to navigate */}
                        <NotificationsIcon className='icon' />  {/* Render NotificationsIcon with CSS class 'icon' */}
                        <span>Notifications</span>  {/* Render text 'Notifications' */}
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
