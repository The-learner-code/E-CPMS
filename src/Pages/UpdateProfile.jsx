import React, { useState, useEffect } from "react";
import { auth, db, storage } from "../firebase"; // Firebase imports
import { setDoc, doc, getDoc } from "firebase/firestore"; // Firestore imports
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Storage imports
import { toast, toastContainer } from '../toastservice'; // Toast notifications
import { useNavigate } from 'react-router-dom'; // React Router navigation
import Navbar from "../Components/navbar/Navbar"; // Navbar component
import Sidebar from "../Components/sidebar/Stu_Sidebar"; // Sidebar component
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined"; // Material-UI icon
import "../SassyCSS/updateprofile.scss"; // Custom CSS styles

const UpdateProfile = () => {
    const navigate = useNavigate();
    const [file, setFile] = useState(""); // State for uploaded file (image)
    const [emailid, setEmailid] = useState(auth.currentUser?.email || ""); // State for user's email
    const [name, setName] = useState(""); // State for user's name
    const [registerno, setRegisterno] = useState(""); // State for user's registration number
    const [batch, setBatch] = useState(""); // State for user's batch
    const [dep, setDep] = useState(""); // State for user's department
    const [sem, setSem] = useState(""); // State for user's current semester
    const [cgpa, setCGPA] = useState(""); // State for user's current CGPA
    const [placementStatus, setPlacementStatus] = useState(""); // State for user's placement status
    const [address, setAddress] = useState(""); // State for user's address
    const [dis, setDis] = useState(""); // State for user's district
    const [state, setState] = useState(""); // State for user's state
    const [phone, setPhone] = useState(""); // State for user's phone number
    const [pin, setPin] = useState(""); // State for user's pincode
    const [photo, setPhoto] = useState(null); // State for uploaded photo
    const [photoURL, setPhotoURL] = useState(""); // State for photo URL
    const [resume, setResume] = useState(null); // State for uploaded resume
    const [resumeURL, setResumeURL] = useState(""); // State for resume URL

    // Effect to set email id if user is logged in
    useEffect(() => {
        const user = auth.currentUser;
        if (user) {
            setEmailid(user.email);
        } else {
            toast.error("Not a valid user..Login again...!");
            setTimeout(() => {
                navigate('/');
            }, 2500);
        }
    }, [navigate]);

    // Effect to fetch user data from Firestore
    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = auth.currentUser;
                const docRef = doc(db, "StudentsInformation", user.email);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    // Setting user data from Firestore to component state
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

        fetchData();
    }, []);

    // Function to reset form fields
    const resetForm = () => {
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

    // Function to validate email format
    const validateEmail = (emailid) => /^[0-9]+@(sastra\.ac\.in|gmail\.com)$/.test(String(emailid).toLowerCase());

    const handlePhotoUpload = async () => {

        if (!photo) return photoURL;
        const photoRef = ref(storage, `user_photos/${auth.currentUser.uid}/${photo.name}`);
        await uploadBytes(photoRef, photo);
        return await getDownloadURL(photoRef);
    };

    // Function to handle resume upload to Firebase Storage
    const handleResumeUpload = async () => {
        if (!resume) return resumeURL;
        if (resume.type !== "application/pdf") {
            toast.error("Only PDF files are allowed for resume");
            return null;
        }
        const resumeRef = ref(storage, `user_resumes/${auth.currentUser.uid}`);
        await uploadBytes(resumeRef, resume);
        return await getDownloadURL(resumeRef);
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = auth.currentUser;
        const emailPrefix = user.email.split('@')[0];

        // Validation checks
        if (!validateEmail(emailid.trim())) {
            toast.error("Please enter a valid Email_id...!");
            return;
        }
        if (name.trim() === "") {
            toast.error("Name should not be empty or blank");
            return;
        }
        if (registerno.trim() === "" || registerno !== emailPrefix) {
            toast.error("Register Number should be exactly match the part before '@' in your email");
            return;
        }
        if (batch.trim() === "") {
            toast.error("Batch should not be empty");
            return;
        }
        if (dep.trim() === "") {
            toast.error("Department should not be empty");
            return;
        }
        if (sem.trim() === "") {
            toast.error("Semester should not be empty");
            return;
        }
        if (cgpa.trim() === "" || isNaN(cgpa) || parseFloat(cgpa) < 0 || parseFloat(cgpa) > 10) {
            toast.error("CGPA should be a number between 0 and 10");
            return;
        }
        if (address.trim() === "") {
            toast.error("Address should not be empty or blank");
            return;
        }
        if (dis.trim() === "") {
            toast.error("District should not be empty or blank");
            return;
        }
        if (state.trim() === "") {
            toast.error("State should not be empty or blank");
            return;
        }
        if (pin.trim() === "" || pin.trim().length !== 6) {
            toast.error("Pincode should be exactly 6 digits");
            return;
        }
        if (phone.trim() === "" || phone.trim().length !== 10) {
            toast.error("Phone Number should be exactly 10 digits");
            return;
        }
        if (placementStatus.trim() === "") {
            toast.error("Placement status should not be empty");
            return;
        }

        try {
            // Upload photo and resume to Storage
            const uploadedPhotoURL = await handlePhotoUpload();
            const uploadedResumeURL = await handleResumeUpload();
            if (!uploadedResumeURL) {
                toast.error("Resume is empty, Please add resume");
                return;
            }
            if (!uploadedPhotoURL) {
                toast.error("Photo is empty, Please add photo");
                return;
            }

            // Update user data in Firestore
            const docRef = doc(db, "StudentsInformation", user.email);
            await setDoc(docRef, {
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

            // Success message and navigation
            toast.success(`${user.email} Profile updated successfully!`);
            setTimeout(() => {
                navigate('/ViewProfile');
            }, 2500);

            // Reset form fields
            resetForm();
        } catch (error) {
            toast.error(`Profile updation Unsuccessful. Error code: ${error.message}`);
        }
    };

    return (
        <div className="new">
            {/* Toast notification container */}
            {toastContainer}
            {/* Sidebar component */}
            <Sidebar />

            <div className="newcontainer">
                {/* Navbar component */}
                <Navbar />

                <div className="top">
                    <h1>Update your profile...!</h1>
                </div>

                <div className="bottom">
                    <div className="left">
                        {/* Display uploaded photo or default image */}
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
                        {/* Form for updating user profile */}
                        <form onSubmit={handleSubmit} autoComplete="off">
                            <div className="forminput">
                                <label htmlFor="file">
                                    Image :<DriveFolderUploadOutlinedIcon className="icon" />
                                </label>
                                {/* Input for uploading image */}
                                <input type="file" accept="image/*" onChange={(e) => { setPhoto(e.target.files[0]); setFile(e.target.files[0]); }} id="file" style={{ display: "none" }} />
                            </div>

                            <div className="forminput">
                                <label htmlFor="resume">
                                    Upload Your Resume (PDF) :<DriveFolderUploadOutlinedIcon className="icon" />
                                </label>
                                {/* Input for uploading resume */}
                                <input type="file" accept="application/pdf" onChange={(e) => setResume(e.target.files[0])} id="resume" style={{ display: "none" }} />
                            </div>

                            {/* Input fields for user profile information */}
                            <div className="forminput">
                                <label>Email ID :</label>
                                <input type="text" value={emailid} onChange={(e) => setEmailid(e.target.value)} readOnly />
                            </div>

                            <div className="forminput">
                                <label>Name :</label>
                                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>

                            <div className="forminput">
                                <label>Register No :</label>
                                <input type="text" value={registerno} onChange={(e) => setRegisterno(e.target.value)} />
                            </div>

                            <div className="forminput">
                                <label>Batch :</label>
                                <select value={batch} onChange={(e) => setBatch(e.target.value)} >
                                    <option value="">Select Batch</option>
                                    {Array.from({ length: 50 }, (_, i) => 1975 + i).map(year => (
                                        <option key={year} value={year}>{year}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="forminput">
                                <label>Department :</label>
                                <select value={dep} onChange={(e) => setDep(e.target.value)} >
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
                                <label>Current Semester :</label>
                                <select value={sem} onChange={(e) => setSem(e.target.value)} >
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
                                <label>Current CGPA :</label>
                                <input type="text" value={cgpa} onChange={(e) => setCGPA(e.target.value)} />
                            </div>
                            <div className="forminput">
                                <label>Placement Status :</label>
                                <select value={placementStatus} onChange={(e) => setPlacementStatus(e.target.value)} >
                                    <option value="">Select Placement Status</option>
                                    <option value="Placed">Placed</option>
                                    <option value="Non-Placed">Non-Placed</option>
                                </select>
                            </div>

                            <div className="forminput">
                                <label>Address :</label>
                                <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
                            </div>

                            <div className="forminput">
                                <label>District :</label>
                                <input type="text" value={dis} onChange={(e) => setDis(e.target.value)} />
                            </div>

                            <div className="forminput">
                                <label>State :</label>
                                <input type="text" value={state} onChange={(e) => setState(e.target.value)} />
                            </div>

                            <div className="forminput">
                                <label>Phone Number :</label>
                                <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
                            </div>

                            <div className="forminput">
                                <label>Pincode :</label>
                                <input type="text" value={pin} onChange={(e) => setPin(e.target.value)} />
                            </div>

                            {/* Submit button */}
                            <button type="submit">Update</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateProfile;

