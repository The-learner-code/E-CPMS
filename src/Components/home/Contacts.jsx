// Import React library
import React from 'react';
// Import the CSS file for styling
import '../../SassyCSS/home.scss';
// Import the mail icon
import mail_icon from '../../Assets/mail-icon.png';
// Import the phone icon
import phone_icon from '../../Assets/phone-icon.png';
// Import the location icon
import location_icon from '../../Assets/location-icon.png';

// Assuming you have initialized Firestore as `db`
import { db } from '../../firebase';
import { setDoc, doc } from "firebase/firestore"; // Firestore imports

// Define the Contacts functional component
const Contacts = () => {
    // Declare a state variable 'result' with initial value as an empty string
    const [result, setResult] = React.useState("");

    // Function to handle form submission
    const onSubmit = async (event) => {
        // Prevent default form submission behavior
        event.preventDefault();
        // Set the result state to "Sending...." to indicate form submission in progress
        setResult("Sending....");
        // Create a new FormData object from the form elements
        const formData = new FormData(event.target);
    
        // Append access key to the form data
        formData.append("access_key", "08a07d38-5ca7-4563-9bdf-eef01025fcb8");
    
        // Send form data to the server using fetch API
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST", // HTTP method
            body: formData // Form data
        });
    
        // Parse the JSON response from the server
        const data = await response.json();
    
        // Check if the form submission was successful
        if (data.success) {
            // Update the result state to indicate success
            setResult("Form Submitted Successfully");
            // Reset the form fields
            event.target.reset();
    
            // Save form data to Firestore using docRef and setDoc
            const emailId = formData.get('Email_id'); // Use Email_id as document name
            const docRef = doc(db, `TechSupport/${emailId}`);
    
            // Format timestamp to IST (Indian Standard Time)
            const ISTDateString = new Date().toLocaleString('en-IN', {
                timeZone: 'Asia/Kolkata',
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true,  // Use 12-hour clock
                hourCycle: 'h12'  // Ensure AM/PM is included
            });
    
            await setDoc(docRef, {
                Email_id: formData.get('Email_id'),
                Registered_no: formData.get('Registered_no'),
                Message: formData.get('Message'),
                Timestamp: ISTDateString  // Save IST formatted timestamp as string
            });
    
        } else {
            // Log the error message
            console.log("Error", data);
            // Update the result state with the error message
            setResult(data.message);
        }
    };
    
    // Return the JSX for the Contacts section
    return (
        // Container for the contact section with a specific class name for styling
        <div className='contactlp'>
            {/* First column containing the contact information */}
            <div className="contact-col">
                {/* Heading with an icon */}
                <h3>Send us a message</h3>
                {/* Paragraph text providing information */}
                <p>Feel free to reach out through contact form or find our contact information below. Your feedback, questions, and suggestion are important to us as we strive to provide exceptional services to our university community.</p>
                {/* List of contact details */}
                <ul>
                    {/* Email contact detail */}
                    <li><img src={mail_icon} alt="" />Cecpms@gmail.com</li>
                    {/* Phone contact detail */}
                    <li><img src={phone_icon} alt="" />+91 978-6534-201</li>
                    {/* Address contact detail */}
                    <li><img src={location_icon} alt="" />88 Seven block, Cambridge<br /> MA 02139, TamilNadu</li>
                </ul>
            </div>
            {/* Second column containing the contact form */}
            <div className="contact-col">
                {/* Form with onSubmit handler */}
                <form onSubmit={onSubmit}>
                    {/* Label and input for name */}
                    <label>Your Email Id</label>
                    <input type="email" name='Email_id' placeholder='Enter your Email' required />
                    {/* Label and input for registered number */}
                    <label>Registered Number</label>
                    <input type="tel" name='Registered_no' placeholder='Enter your registered No' required />
                    {/* Label and textarea for message */}
                    <label>Write your message here</label>
                    <textarea name="Message" rows="6" placeholder='Enter your message, Admin will assist you soon...!' required></textarea>
                    {/* Submit button with an icon */}
                    <button type='submit' className='btn dark-btn'>Submit</button>
                </form>
                {/* Display the result message */}
                <span>{result}</span>
            </div>
        </div>
    );
};

// Export the Contacts component as the default export
export default Contacts;
