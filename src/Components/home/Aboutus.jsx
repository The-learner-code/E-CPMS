// Import the CSS file for styling
import '../../SassyCSS/home.scss';
// Import the image for the about section
import about_img from '../../Assets/gallery-3.png';

// Define the Aboutus functional component
const Aboutus = () => {
  // Return the JSX for the Aboutus section
  return (
    // Container for the about us section with a specific class name for styling
    <div className='aboutuslp'>
      {/* Left section containing the image */}
      <div className='about-left'>
        {/* Image element with source and alt text */}
        <img src={about_img} alt="" className='about-img' />
      </div>
      {/* Right section containing the text content */}
      <div className='about-right'>
        {/* Heading for the about section */}
        <h3>ABOUT UNIVERSITY</h3>
        {/* Subheading for the about section */}
        <h2>Welcome to SASTRA University</h2>
        {/* Paragraph with information about the university */}
        <p>At SASTRA University, we are committed to fostering academic excellence and holistic development. Established in 1984, SASTRA has evolved into a premier institution of higher learning, known for its innovative teaching methods and research-oriented approach.</p>
        {/* Paragraph with information about the university's mission */}
        <p>Our mission is to provide a conducive learning environment that nurtures creativity, critical thinking, and leadership. With a diverse range of programs across engineering, science, technology, arts, and management, we equip our students with the skills and knowledge needed to excel in their chosen fields.</p>
        {/* Paragraph inviting students to join the university */}
        <p>Join us at SASTRA as we continue to push the boundaries of education and research. Thank you for choosing SASTRA University – we look forward to shaping the future together!</p>
      </div>
    </div>
  );
};

// Export the Aboutus component as the default export
export default Aboutus;
