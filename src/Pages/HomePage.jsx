// Import Hero and Navbar components
import Hero from '../Components/home/Hero';
import Navbar from '../Components/home/Navbar';

// Define the HomePage functional component
export const HomePage = () => {
    // Return the JSX for HomePage
    return (
        <div>
            {/* Render Navbar component */}
            <Navbar />
            {/* Render Hero component */}
            <Hero />
        </div>
    );
};

// Export the HomePage component as the default export
export default HomePage;
