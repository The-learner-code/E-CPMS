import React from 'react';  // Import React library
import { useNavigate } from 'react-router-dom';  // Import useNavigate hook from React Router
import { auth } from "../../firebase";  // Import 'auth' object from Firebase
import '../../SassyCSS/sidebar.scss';  // Import styles for the sidebar component
import ContactPageIcon from '@mui/icons-material/ContactPage'; // Import ContactPageIcon from Material-UI icons
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges'; // Import PublishedWithChangesIcon from Material-UI icons
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';  // Import NotificationsIcon from Material-UI icons
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
            {toastContainer}{/* Render ToastContainer for notifications */}
            <div className="top">  {/* Render top section of sidebar */}
                <span className="logo">PlacementPulse</span>  {/* Render logo text */}
            </div>
            <hr />  {/* Render horizontal line */}
            <div className="center">  {/* Render center section of sidebar */}
                <ul>  {/* Render unordered list */}
                    <li onClick={() => navigate('/ViewProfile')}>  {/* Render list item for profile page with click event to navigate */}
                        <ContactPageIcon className='icon' />  {/* Render ContactPageIcon with CSS class 'icon' */}
                        <span>Profile</span>  {/* Render text 'Profile' */}
                    </li>
                    <li onClick={() => navigate('/ViewPlacementResults')}>  {/* Render list item for placement result page with click event to navigate */}
                        <PublishedWithChangesIcon className='icon' />  {/* Render AssignmentTurnedInIcon with CSS class 'icon' */}
                        <span>Placement Results</span>  {/* Render text 'Placement Result' */}
                    </li>
                    <li onClick={() => navigate('/ViewNotificationMsg')}>  {/* Render list item for notification page with click event to navigate */}
                        <NotificationsActiveIcon className='icon' />  {/* Render NotificationsIcon with CSS class 'icon' */}
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
