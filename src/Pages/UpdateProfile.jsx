import React, { useState, useEffect } from "react";  // Import React, useState, and useEffect from React library
import { auth, db, storage } from "../firebase";  // Import auth, db, and storage from Firebase
import { setDoc, doc, getDoc } from "firebase/firestore";  // Import setDoc, doc, and getDoc from Firestore
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";  // Import ref, uploadBytes, and getDownloadURL from Firebase Storage
import { ToastContainer, toast } from 'react-toastify';  // Import ToastContainer and toast from react-toastify
import { useNavigate } from 'react-router-dom';  // Import useNavigate hook from React Router
import Navbar from "../Components/navbar/Navbar";  // Import Navbar component
import Sidebar from "../Components/sidebar/Stu_Sidebar";  // Import Sidebar component
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";  // Import DriveFolderUploadOutlinedIcon from MUI icons
import "../SassyCSS/updateprofile.scss";  // Import styles for update profile page

const New = () => {  // Define New functional component
    const navigate = useNavigate();  // Initialize navigate function from React Router
    const [file, setFile] = useState("");  // Initialize state for file
    const [emailid, setEmailid] = useState(auth.currentUser?.email || "");  // Initialize state for email ID
    const [name, setName] = useState("");  // Initialize state for name
    // Initialize state for other profile details like registration number, batch, department, etc.
    const [registerno, setRegisterno] = useState("");
    const [batch, setBatch] = useState("");
    const [dep, setDep] = useState("");
    const [sem, setSem] = useState("");
    const [cgpa, setCGPA] = useState("");
    const [placementStatus, setPlacementStatus] = useState("");
    const [address, setAddress] = useState("");
    const [dis, setDis] = useState("");
    const [state, setState] = useState("");
    const [phone, setPhone] = useState("");
    const [pin, setPin] = useState("");
    const [photo, setPhoto] = useState(null);  // Initialize state for photo
    const [photoURL, setPhotoURL] = useState("");  // Initialize state for photo URL
    const [resume, setResume] = useState(null);  // Initialize state for resume
    const [resumeURL, setResumeURL] = useState("");  // Initialize state for resume URL

    useEffect(() => {  // Effect hook to check if user is logged in
        const user = auth.currentUser;
        if (user) {
            setEmailid(user.email);
        } else {
            toast.error("Not a valid user..Login again...!");
            setTimeout(() => {
                navigate('/');
            }, 2000);
        }
    }, [navigate]);  // Dependency array to run effect only once

    useEffect(() => {  // Effect hook to fetch user data from Firestore
        const fetchData = async () => {
            try {
                const user = auth.currentUser;
                const docRef = doc(db, "StudentsInformation", user.email);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    // Set user data to state variables
                    setName(data.Name || "");
                    setRegisterno(data.Register_No || "");
                    setEmailid(data.Email_id || user.email);
                    setBatch(data.Batch || "");
                    setDep(data.Department || "");
                    setSem(data.Current_Semester || "");
                    setCGPA(data.Current_Cgpa || "");
                    setPlacementStatus(data.Placement || "");
                    setAddress(data.Address || "");
                    setDis(data.District || "");
                    setState(data.State || "");
                    setPhone(data.Phone_No || "");
                    setPin(data.Pincode || "");
                    setPhotoURL(data.Photo_URL || "");
                    setResumeURL(data.Resume_URL || "");
                }
            } catch (error) {
                toast.error("Failed to fetch data. Please try again later.");
            }
        };

        fetchData();  // Call fetchData function
    }, []);  // Empty dependency array to run effect only once

    const resetForm = () => {  // Function to reset form fields
        // Reset all state variables
        setName("");
        setRegisterno("");
        setEmailid(auth.currentUser?.email || "");
        setBatch("");
        setDep("");
        setSem("");
        setCGPA("");
        setPlacementStatus("");
        setAddress("");
        setPhone("");
        setPin("");
        setDis("");
        setState("");
        setPhoto(null);
        setPhotoURL("");
        setResume(null);
        setResumeURL("");
    };

    const validateEmail = (emailid) => /^[0-9]+@(sastra\.ac\.in|gmail\.com)$/.test(String(emailid).toLowerCase());  // Function to validate email format

    const handlePhotoUpload = async () => {  // Function to handle photo upload
        if (!photo) return photoURL;  // If no photo, return existing photo URL
        const photoRef = ref(storage, `user_photos/${auth.currentUser.uid}/${photo.name}`);
        await uploadBytes(photoRef, photo);  // Upload photo to storage
        return await getDownloadURL(photoRef);  // Return download URL of uploaded photo
    };

    const handleResumeUpload = async () => {  // Function to handle resume upload
        if (!resume) return resumeURL;  // If no resume, return existing resume URL
        if (resume.type !== "application/pdf") {  // Check if file type is PDF
            toast.error("Only PDF files are allowed for resume");  // Display error if file type is not PDF
            return null;
        }
        const resumeRef = ref(storage, `user_resumes/${auth.currentUser.uid}`);
        await uploadBytes(resumeRef, resume);  // Upload resume to storage
        return await getDownloadURL(resumeRef);  // Return download URL of uploaded resume
    };

    const handleSubmit = async (e) => {  // Function to handle form submission
        e.preventDefault();  // Prevent default form submission

        const user = auth.currentUser;  // Get current user
        const emailPrefix = user.email.split('@')[0];  // Extract email prefix

        // Validate form fields
        if (!validateEmail(emailid.trim())) {  // Validate email format
            toast.error("Please enter a valid Email_id...!");
            return;
        }
        if (name.trim() === "") {  // Validate name field
            toast.error("Name should not be empty or blank");
            return;
        }
        if (registerno.trim() === "" || registerno.trim().length !== 11 || registerno !== emailPrefix) {  // Validate registration number
            toast.error("Register Number should be exactly 11 digits and match the part before '@' in your email");
            return;
        }
        if (cgpa.trim() === "" || isNaN(cgpa) || parseFloat(cgpa) < 0 || parseFloat(cgpa) > 10) {  // Validate CGPA
            toast.error("CGPA should be a number between 0 and 10");
            return;
        }
        if (phone.trim() === "" || phone.trim().length !== 10) {  // Validate phone number
            toast.error("Phone Number should be exactly 10 digits");
            return;
        }

        try {
            const uploadedPhotoURL = await handlePhotoUpload();  // Upload photo if available
            const uploadedResumeURL = await handleResumeUpload();  // Upload resume if available
            if (!uploadedResumeURL) {  // Check if resume upload failed
                return;
            }

            const docRef = doc(db, "StudentsInformation", user.email);  // Get document reference
            await setDoc(docRef, {  // Update document with new data
                Name: name,
                Register_No: registerno,
                Email_id: emailid,
                Batch: batch,
                Department: dep,
                Current_Semester: sem,
                Current_Cgpa: cgpa,
                Placement: placementStatus,
                Address: address,
                District: dis,
                State: state,
                Pincode: pin,
                Phone_No: phone,
                Photo_URL: uploadedPhotoURL,
                Resume_URL: uploadedResumeURL
            });
            toast.success(`${user.email} Profile updated successfully!`);  // Display success message
            setTimeout(() => {
                navigate('/ViewProfile');  // Redirect to profile page
            }, 2000);
            resetForm();  // Reset form fields
        } catch (error) {
            toast.error(`Profile updation Unsuccessful. Error code: ${error.message}`);  // Display error message
        }
    };

    return (
        <div className="new">
            {/* Render ToastContainer for notifications */}
            <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            <Sidebar />  {/* Render sidebar */}
            <div className="newcontainer">
                <Navbar />  {/* Render Navbar */}
                <div className="top">
                    <h1>Update your profile...!</h1>  {/* Render heading */}
                </div>
                <div className="bottom">
                    <div className="left">
                        {/* Render profile photo */}
                        <img
                            src={
                                file
                                    ? URL.createObjectURL(file)
                                    : photoURL || "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                            }
                            alt=""
                        />
                    </div>
                    <div className="right">
                        {/* Render form for updating profile */}
                        <form onSubmit={handleSubmit} autoComplete="off">
                            {/* Render form inputs */}
                            {/* Each input field with corresponding labels */}
                            <div className="forminput">
                                <label htmlFor="file">
                                    Image :<DriveFolderUploadOutlinedIcon className="icon" />
                                </label>
                                <input type="file" accept="image/*" onChange={(e) => { setPhoto(e.target.files[0]); setFile(e.target.files[0]); }} id="file" style={{ display: "none" }} />
                            </div>
                            <div className="forminput">
                                <label htmlFor="resume">
                                    Upload Your Resume (PDF) :<DriveFolderUploadOutlinedIcon className="icon" />
                                </label>
                                <input type="file" accept="application/pdf" onChange={(e) => setResume(e.target.files[0])} id="resume" style={{ display: "none" }} />
                            </div>
                            <div className="forminput">
                                <label>Register Number</label>
                                <input type="number" value={registerno} onChange={(e) => setRegisterno(e.target.value)} required />
                            </div>
                            <div className="forminput">
                                <label>Name and Surname</label>
                                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                            </div>
                            <div className="forminput">
                                <label>Batch</label>
                                <select value={batch} onChange={(e) => setBatch(e.target.value)} required>
                                    <option value="">Select Batch</option>
                                    {Array.from({ length: 50 }, (_, i) => 1975 + i).map(year => (
                                        <option key={year} value={year}>{year}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="forminput">
                                <label>Department</label>
                                <select value={dep} onChange={(e) => setDep(e.target.value)} required>
                                    <option value="">Select Department</option>
                                    <option value="BCA">BCA</option>
                                    <option value="MCA">MCA</option>
                                    <option value="B.Sc">B.Sc</option>
                                    <option value="M.Sc">M.Sc</option>
                                    <option value="B.Tech">B.Tech</option>
                                    <option value="M.Tech">M.Tech</option>
                                </select>
                            </div>
                            <div className="forminput">
                                <label>Semester</label>
                                <select value={sem} onChange={(e) => setSem(e.target.value)} required>
                                    <option value="">Pursuing Semester</option>
                                    <option value="First">First</option>
                                    <option value="Second">Second</option>
                                    <option value="Third">Third</option>
                                    <option value="Fourth">Fourth</option>
                                    <option value="Fifth">Fifth</option>
                                    <option value="Sixth">Sixth</option>
                                    <option value="Seventh">Seventh</option>
                                    <option value="Eighth">Eighth</option>
                                </select>
                            </div>
                            <div className="forminput">
                                <label>Current CGPA</label>
                                <input type="number"  value={cgpa} onChange={(e) => setCGPA(e.target.value)} step="0.01" min="0" max="10" required />
                            </div>
                            <div className="forminput">
                                <label>Address</label>
                                <input type='text' value={address} onChange={(e) => setAddress(e.target.value)} required />
                            </div>
                            <div className="forminput">
                                <label>District</label>
                                <input type='text' value={dis} onChange={(e) => setDis(e.target.value)} required />
                            </div>
                            <div className="forminput">
                                <label>State</label>
                                <input type='text' value={state} onChange={(e) => setState(e.target.value)} required />
                            </div>
                            <div className="forminput">
                                <label>Pincode</label>
                                <input className='input-up' type="number" value={pin} onChange={(e) => setPin(e.target.value)} required />
                            </div>
                            <div className="forminput">
                                <label>Phone Number</label>
                                <input className='input-up' type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} pattern="\d{10}" required />
                            </div>
                            <div className="forminput">
                                <label>Placement Status</label>
                                <select value={placementStatus} onChange={(e) => setPlacementStatus(e.target.value)} required>
                                    <option value="">Status</option>
                                    <option value="Placed">Placed</option>
                                    <option value="Non-Placed">Non-Placed</option>
                                </select>
                            </div>
                            <button type="submit">Send</button>  {/* Submit button */}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default New;  // Export New component as default

