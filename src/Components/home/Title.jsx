// Import the CSS file for styling
import '../../SassyCSS/home.scss';

// Define the Title functional component with props 'subtitle' and 'title'
const Title = ({ subtitle, title }) => {
    // Return the JSX for the Title component
    return (
        // Container for the title with a specific class name for styling
        <div className='title'>
            {/* Subtitle displayed as a paragraph */}
            <p>{subtitle}</p>
            {/* Main title displayed as a heading */}
            <h2>{title}</h2>
        </div>
    );
};

// Export the Title component as the default export
export default Title;
