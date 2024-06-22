import React, { useState, useEffect } from "react";
import { auth, db, storage } from "../firebase";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Navbar from "../Components/navbar/Navbar";
import Sidebar from "../Components/sidebar/Stu_Sidebar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import "../SassyCSS/updateprofile.scss";

const UpdateProfile = () => {
    const navigate = useNavigate();
    const [file, setFile] = useState("");
    const [emailid, setEmailid] = useState(auth.currentUser?.email || "");
    const [name, setName] = useState("");
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
    const [photo, setPhoto] = useState(null);
    const [photoURL, setPhotoURL] = useState("");
    const [resume, setResume] = useState(null);
    const [resumeURL, setResumeURL] = useState("");

    useEffect(() => {
        const user = auth.currentUser;
        if (user) {
            setEmailid(user.email);
        } else {
            toast.error("Not a valid user..Login again...!");
            setTimeout(() => {
                navigate('/');
            }, 2000);
        }
    }, [navigate]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = auth.currentUser;
                const docRef = doc(db, "StudentsInformation", user.email);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
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

    const validateEmail = (emailid) => /^[0-9]+@(sastra\.ac\.in|gmail\.com)$/.test(String(emailid).toLowerCase());

    const handlePhotoUpload = async () => {
        if (!photo) return photoURL;
        const photoRef = ref(storage, `user_photos/${auth.currentUser.uid}/${photo.name}`);
        await uploadBytes(photoRef, photo);
        return await getDownloadURL(photoRef);
    };

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = auth.currentUser;
        const emailPrefix = user.email.split('@')[0];

        if (!validateEmail(emailid.trim())) {
            toast.error("Please enter a valid Email_id...!");
            return;
        }
        if (name.trim() === "") {
            toast.error("Name should not be empty or blank");
            return;
        }
        if (registerno.trim() === "" || registerno.trim().length !== 11 || registerno !== emailPrefix) {
            toast.error("Register Number should be exactly 11 digits and match the part before '@' in your email");
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
            const uploadedPhotoURL = await handlePhotoUpload();
            const uploadedResumeURL = await handleResumeUpload();
            if (!uploadedResumeURL) {
                return;
            }

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
            toast.success(`${user.email} Profile updated successfully!`);
            setTimeout(() => {
                navigate('/ViewProfile');
            }, 2000);
            resetForm();
        } catch (error) {
            toast.error(`Profile updation Unsuccessful. Error code: ${error.message}`);
        }
    };

    return (
        <div className="new">
            <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            <Sidebar />
            <div className="newcontainer">
                <Navbar />
                <div className="top">
                    <h1>Update your profile...!</h1>
                </div>
                <div className="bottom">
                    <div className="left">
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
                        <form onSubmit={handleSubmit} autoComplete="off">
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
                                <input type="text" value={batch} onChange={(e) => setBatch(e.target.value)} />
                            </div>
                            <div className="forminput">
                                <label>Department :</label>
                                <input type="text" value={dep} onChange={(e) => setDep(e.target.value)} />
                            </div>
                            <div className="forminput">
                                <label>Current Semester :</label>
                                <input type="text" value={sem} onChange={(e) => setSem(e.target.value)} />
                            </div>
                            <div className="forminput">
                                <label>Current CGPA :</label>
                                <input type="text" value={cgpa} onChange={(e) => setCGPA(e.target.value)} />
                            </div>
                            <div className="forminput">
                                <label>Placement Status :</label>
                                <input type="text" value={placementStatus} onChange={(e) => setPlacementStatus(e.target.value)} />
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
                            <button type="submit">Update</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateProfile;
