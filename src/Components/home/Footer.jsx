// Import the CSS file for styling
import '../../SassyCSS/home.scss';

// Define the Footer functional component
const Footer = () => {
    // Return the JSX for the Footer
    return (
        // Container for the footer with a specific class name for styling
        <div className='footer'>
            {/* Footer text */}
            <p>© 2024 Enhanced - CPM Service. All rights reserved.</p>
            {/* List of footer links */}
            <ul>
                {/* List item for Terms of Services */}
                <li>Term of Services</li>
                {/* List item for Privacy Policy */}
                <li>Privacy Policy</li>
            </ul>
        </div>
    );
};

// Export the Footer component as the default export
export default Footer;
