// Import useEffect and useState hooks from React
import { useEffect, useState } from 'react';
// Import Link component from react-scroll for smooth scrolling
import { Link } from 'react-scroll';
// Import stylesheet for the component
import '../../SassyCSS/home.scss';

// Define the Navbar functional component
const Navbar = () => {
    // Declare a state variable 'fixed' with initial value 'false'
    const [fixed, setFixed] = useState(false);

    // useEffect hook to add an event listener for the scroll event
    useEffect(() => {
        // Function to handle the scroll event
        const handleScroll = () => {
            // If the scroll position is greater than 50, set 'fixed' to true, else set it to false
            setFixed(window.scrollY > 50);
        };

        // Add the scroll event listener to the window object
        window.addEventListener('scroll', handleScroll);

        // Cleanup function to remove the scroll event listener
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []); // Empty dependency array ensures this effect runs only once

    // Return the JSX for the Navbar
    return (
        // Navbar element with dynamic class based on 'fixed' state
        <nav className={`container ${fixed ? 'dark-nav' : ''}`}>
            {/* Static navbar logo text */}
            <span className='nv-logo'>Placement Pulse</span>
            {/* Uncomment the following line to use an image logo instead */}
            {/* <img src={logo} alt="" className='nv-logo' /> */}
            {/* Navigation links */}
            <ul>
                {/* Link to Home section */}
                <li><Link to='hero-lp' smooth={true} offset={0} duration={500}>Home</Link></li>
                {/* Link to About Us section */}
                <li><Link to='aboutuslp' smooth={true} offset={-150} duration={500}>About us</Link></li>
                {/* Link to Contact Us section */}
                <li><Link to='contactlp' smooth={true} offset={-260} duration={500}>Contact us</Link></li>
            </ul>
        </nav>
    );
};

// Export the Navbar component as the default export
export default Navbar;
