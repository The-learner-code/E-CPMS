// Import useNavigate hook from react-router-dom
import { useNavigate } from 'react-router-dom';
// Import the arrow image
import dark_arrow from '../../Assets/dark-arrow.png';
// Import stylesheet for the component
import '../../SassyCSS/home.scss';

// Define the Hero functional component
const Hero = () => {
    // useNavigate hook to programmatically navigate
    const navigate = useNavigate();

    // Return the JSX for the Hero section
    return (
        // Container for the Hero section
        <div className='hero-lp container'>
            {/* Text content of the Hero section */}
            <div className="hero-lp-text">
                {/* Main heading */}
                <h1>Empowering Your Future</h1>
                {/* Paragraph text */}
                <p>Your gateway to a successful career begins here. Explore opportunities, Connect with experienced staff, manage interview schedules, and track your progress seamlessly.</p>
                {/* Button to navigate to Login and Register page */}
                <button className='btn' onClick={() => navigate('/LoginAndRegister')}>
                    Explore the features
                    {/* Arrow image inside the button */}
                    <img src={dark_arrow} alt="" />
                </button>
            </div>
        </div>
    );
};

// Export the Hero component as the default export
export default Hero;
