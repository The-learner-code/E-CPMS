import React, { useState, useEffect } from "react";  // Importing React and necessary hooks from React library
import { auth } from "../../firebase";  // Importing the 'auth' object from the 'firebase' module
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";  // Importing an icon component from Material-UI
import "./navbar.scss";  // Importing styles for the Navbar component

const Navbar = () => {  // Defining the functional component Navbar
    const [email, setEmail] = useState("");  // Using the useState hook to manage state for email

    useEffect(() => {  // Using the useEffect hook for side effects (e.g., fetching data, subscribing to events)
        const user = auth.currentUser;  // Getting the current user from the 'auth' module
        if (user) {  // Checking if a user is logged in
            setEmail(user.email);  // Setting the email state to the user's email
        } else {
            setEmail("No user logged in");  // Setting the email state if no user is logged in
        }
    }, []);  // Empty dependency array means this effect runs only once after the initial render

    return (
        <div className="navbar">   {/* Rendering the Navbar container with a CSS class "navbar" */}
            <div className="wrapper">  {/* Rendering a wrapper div with a CSS class "wrapper" */}
                <span>{email}</span>  {/* Displaying the email inside a span element */}
                <div className="items"> {/* Rendering a container for items with a CSS class "items" */}
                    <div className="item">  {/* Rendering an item div with a CSS class "item"*/}
                        <LanguageOutlinedIcon className="icon" />  {/* Rendering the LanguageOutlinedIcon with a CSS class "icon" */}
                        English  {/* Displaying the text "English" */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;  // Exporting the Navbar component as the default export
