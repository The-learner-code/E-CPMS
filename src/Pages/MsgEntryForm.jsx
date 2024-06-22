import React, { useState } from 'react';
import { doc, setDoc } from 'firebase/firestore'; // Import Firestore functions for document operations
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook for navigation
import { db } from '../firebase'; // Import Firebase Firestore instance
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast for notifications
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS for notifications
import Sidebar from '../Components/sidebar/Staff_Sidebar'; // Import Sidebar component
import Navbar from '../Components/navbar/Navbar'; // Import Navbar component
import '../SassyCSS/msgentryform.scss'; // Import custom Sassy CSS styles for MsgEntryForm

const MsgEntryForm = () => {
    const [type, setType] = useState(''); // State for notification type
    const [content, setContent] = useState(''); // State for notification content
    const [validFrom, setValidFrom] = useState(''); // State for notification valid from date
    const [validTo, setValidTo] = useState(''); // State for notification valid to date
    const [link, setLink] = useState(''); // State for notification link
    const navigate = useNavigate(); // Initialize navigate function from react-router-dom

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        // Get current date and time in IST
        const now = new Date();
        const timestamp = now.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

        // Replace characters to make it suitable for a Firestore document ID
        const timestampId = now.toISOString().replace(/[:.]/g, '-');

        try {
            // Create a new document with the custom timestamp ID
            await setDoc(doc(db, 'Notification_Logs', timestampId), {
                type,
                content,
                valid_from: validFrom,
                valid_to: validTo,
                link,
                timestamp // Add timestamp as a field in the document
            });

            toast.success('Notification added successfully'); // Success toast notification
            setType(''); // Clear the type input field
            setContent(''); // Clear the content input field
            setValidFrom(''); // Clear the valid from date input field
            setValidTo(''); // Clear the valid to date input field
            setLink(''); // Clear the link input field
            setTimeout(() => {
                navigate('/AddNotification'); // Navigate to AddNotification page after 2 seconds
            }, 2000);
        } catch (error) {
            console.error("Error adding notification: ", error); // Log error to console
            toast.error('Failed to add notification'); // Error toast notification
        }
    };

    return (
        <div className='add'>
            <Sidebar /> {/* Render Sidebar component */}
            <div className="addnotifycontainer">
                <Navbar /> {/* Render Navbar component */}
                <div className="form-container">
                    <h2>Add Notification</h2>
                    <form onSubmit={handleSubmit} autoComplete='off'>
                        <div className="form-group">
                            <label htmlFor="type">Type</label>
                            <input
                                type="text"
                                id="type"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="content">Content</label>
                            <textarea
                                id="content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="valid_from">Valid From</label>
                            <input
                                type="date"
                                id="valid_from"
                                value={validFrom}
                                onChange={(e) => setValidFrom(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="valid_to">Valid To</label>
                            <input
                                type="date"
                                id="valid_to"
                                value={validTo}
                                onChange={(e) => setValidTo(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="link">Link</label>
                            <input
                                type="url"
                                id="link"
                                value={link}
                                onChange={(e) => setLink(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit">Add Notification</button> {/* Submit button */}
                    </form>
                </div>
            </div>
            <ToastContainer /> {/* Toast container for notifications */}
        </div>
    );
};

export default MsgEntryForm; // Export the MsgEntryForm component as the default export
