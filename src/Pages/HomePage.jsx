// Import necessary components from their respective paths
import Hero from '../Components/home/Hero'; // Import Hero component
import Navbar from '../Components/home/Navbar'; // Import Navbar component
import Aboutus from '../Components/home/Aboutus'; // Import Aboutus component
import Title from '../Components/home/Title'; // Import Title component
import Contacts from '../Components/home/Contacts'; // Import Contacts component
import Footer from '../Components/home/Footer'; // Import Footer component

// Define the HomePage functional component
export const HomePage = () => {
    // Return the JSX for HomePage
    return (
        <div>
            {/* Render Navbar component */}
            <Navbar />
            {/* Render Hero component */}
            <Hero />
            {/* Container for the main content */}
            <div className='container'>
                {/* Render Aboutus component */}
                <Aboutus />
                {/* Render Title component with subtitle and title props */}
                <Title subtitle='Contact Us' title='Get Connected' />
                {/* Render Contacts component */}
                <Contacts />
                {/* Render Footer component */}
                <Footer />
            </div>
        </div>
    );
};

// Export the HomePage component as the default export
export default HomePage;
