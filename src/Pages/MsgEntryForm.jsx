import React, { useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../Components/sidebar/Staff_Sidebar';
import Navbar from '../Components/navbar/Navbar';
import '../SassyCSS/msgentryform.scss';

const MsgEntryForm = () => {
    const [type, setType] = useState('');
    const [content, setContent] = useState('');
    const [validFrom, setValidFrom] = useState('');
    const [validTo, setValidTo] = useState('');
    const [link, setLink] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

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

            toast.success('Notification added successfully');
            setType('');
            setContent('');
            setValidFrom('');
            setValidTo('');
            setLink('');
            setTimeout(() => {
                navigate('/AddNotification');
            }, 2000);
        } catch (error) {
            console.error("Error adding notification: ", error);
            toast.error('Failed to add notification');
        }
    };

    return (
        <div className='add'>
            <Sidebar />
            <div className="addnotifycontainer">
                <Navbar />
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
                        <button type="submit">Add Notification</button>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default MsgEntryForm;
