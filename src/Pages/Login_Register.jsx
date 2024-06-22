import React, { useState } from "react"; // Import React and useState hook
import * as Components from '../SassyCSS/stylescomp'; // Import styled components
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook for navigation
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth"; // Import Firebase authentication functions
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast for notifications
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import { auth, db } from '../firebase'; // Import Firebase auth and Firestore database
import { doc, setDoc, updateDoc } from "firebase/firestore"; // Import Firestore functions

function Login_Register() {
    const [signIn, toggle] = useState(true); // State to toggle between sign in and register
    const [remail, setRemail] = useState(""); // State for register email
    const [rpass, setRpass] = useState(""); // State for register password
    const [rconpass, setRconpass] = useState(""); // State for register confirm password
    const [lemail, setLemail] = useState(""); // State for login email
    const [lpass, setLpass] = useState(""); // State for login password

    const navigate = useNavigate(); // Initialize navigate function

    const resetForm = () => {
        setRemail(""); // Reset register email
        setRpass(""); // Reset register password
        setRconpass(""); // Reset register confirm password
        setLemail(""); // Reset login email
        setLpass(""); // Reset login password
    };

    // Validate email format to include formats like 123456@gmail.com and 123456staff@gmail.com
    const validateEmail = (email) => /^[0-9]+(staff)?@(gmail\.com)$/.test(String(email).toLowerCase());

    const handleRegister = async (e) => {
        e.preventDefault(); // Prevent default form submission

        const trimmedEmail = remail.trim(); // Trim register email
        const trimmedPass = rpass.trim(); // Trim register password
        const trimmedConPass = rconpass.trim(); // Trim register confirm password

        if (!validateEmail(trimmedEmail)) {
            toast.error("Please enter a valid Email_id...! Should be '123@gmail.com' Only.", { autoClose: 2500 });
            resetForm();
            return;
        }
        if (trimmedPass.length < 6) {
            toast.error("Password should not be less than 6 characters...!", { autoClose: 2500 });
            resetForm();
            return;
        }
        if (trimmedConPass.length < 6) {
            toast.error("Confirm Password should not be less than 6 characters...!", { autoClose: 2500 });
            resetForm();
            return;
        }
        if (trimmedPass !== trimmedConPass) {
            toast.error("Password and Confirm Password do not match...!", { autoClose: 2500 });
            resetForm();
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, trimmedEmail, trimmedPass); // Create user with email and password
            const user = userCredential.user; // Get user data
            const userData = {
                email: user.email, // User email
                created: user.metadata.creationTime, // User account creation time
                signedIn: user.metadata.lastSignInTime, // Last sign-in time
                uid: user.uid, // User UID
                type: user.email.includes("staff") ? 'Staff' : 'Student' // User type based on email
            };

            await setDoc(doc(db, "AuthDetails", user.uid), userData); // Save user data to Firestore

            toast.success(`${user.email} Registered Successfully, Please Login...!`, { autoClose: 2500 });
            setTimeout(() => {
                toggle(true); // Toggle to sign-in view
                resetForm(); // Reset form
            }, 2000);
        } catch (error) {
            toast.error(`Registration Unsuccessful. Error message: ${error.message}`, { autoClose: 2500 });
            resetForm();
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent default form submission
        const trimmedEmail = lemail.trim(); // Trim login email
        const trimmedPass = lpass.trim(); // Trim login password

        try {
            const userCredential = await signInWithEmailAndPassword(auth, trimmedEmail, trimmedPass); // Sign in with email and password
            const user = userCredential.user; // Get user data

            await updateDoc(doc(db, "AuthDetails", user.uid), {
                signedIn: user.metadata.lastSignInTime // Update last sign-in time
            });

            toast.success("Logged in Successfully...!", { autoClose: 2500 });
            setTimeout(() => {
                if (trimmedEmail === "ecpms@gmail.com") { // Check if user is admin
                    navigate('/UserCred'); // Navigate to admin page
                } else if (trimmedEmail.includes("staff") && trimmedEmail.endsWith("@gmail.com")) { // Check if user is staff
                    navigate('/ListOfStudents'); // Navigate to staff page
                } else {
                    navigate('/ViewProfile'); // Navigate to profile page
                }
            }, 2000);
        } catch (error) {
            toast.error(`Login Unsuccessful. Error message: ${error.message}`, { autoClose: 2500 });
            resetForm();
        }
    };

    const handleForgotPassword = async (e) => {
        e.preventDefault(); // Prevent default form submission
        const trimmedEmail = lemail.trim(); // Trim login email

        if (!trimmedEmail) {
            toast.error("Please enter your email address to reset password.", { autoClose: 2500 });
            resetForm();
            return;
        }

        try {
            await sendPasswordResetEmail(auth, trimmedEmail); // Send password reset email
            toast.success("Password reset email sent successfully.", { autoClose: 2500 });
            resetForm();
        } catch (error) {
            toast.error(`Error sending password reset email: ${error.message}`, { autoClose: 2500 });
            resetForm();
        }
    };

    return (
        <Components.Body>
            <Components.BackButton onClick={() => navigate('/')}>Back to Home</Components.BackButton> {/* Back to home button */}
            <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover /> {/* Toast container */}
            <Components.Container>
                <Components.SignUpContainer signinIn={signIn}>
                    <Components.Form onSubmit={handleRegister}> {/* Register form */}
                        <Components.Title>Get Onboard</Components.Title>
                        <Components.Input type='email' placeholder='Enter Email Id' value={remail} onChange={(e) => setRemail(e.target.value)} required /> {/* Register email input */}
                        <Components.Input type='password' placeholder='Enter Password' value={rpass} onChange={(e) => setRpass(e.target.value)} required /> {/* Register password input */}
                        <Components.Input type='password' placeholder='Confirm Password' value={rconpass} onChange={(e) => setRconpass(e.target.value)} required /> {/* Register confirm password input */}
                        <Components.Button type="submit">Register Today</Components.Button> {/* Register button */}
                    </Components.Form>
                </Components.SignUpContainer>

                <Components.SignInContainer signinIn={signIn}>
                    <Components.Form onSubmit={handleLogin}> {/* Login form */}
                        <Components.Title>Authenticate</Components.Title>
                        <Components.Input type='email' placeholder='Enter Email Id' value={lemail} onChange={(e) => setLemail(e.target.value)} required /> {/* Login email input */}
                        <Components.Input type='password' placeholder='Enter Password' value={lpass} onChange={(e) => setLpass(e.target.value)} required /> {/* Login password input */}
                        <Components.Anchor href='#' onClick={handleForgotPassword}>Forgot your password...!</Components.Anchor> {/* Forgot password link */}
                        <Components.Button type="submit">LogIn</Components.Button> {/* Login button */}
                    </Components.Form>
                </Components.SignInContainer>

                <Components.OverlayContainer signinIn={signIn}>
                    <Components.Overlay signinIn={signIn}>
                        <Components.LeftOverlayPanel signinIn={signIn}>
                            <Components.Title>Unlock Your Potential!</Components.Title> {/* Overlay title */}
                            <Components.Paragraph>
                                Dive into a world of opportunities. Sign in with your credentials to explore your future.
                            </Components.Paragraph>
                            <Components.GhostButton onClick={() => toggle(true)}>
                                Log In
                            </Components.GhostButton>
                        </Components.LeftOverlayPanel>

                        <Components.RightOverlayPanel signinIn={signIn}>
                            <Components.Title>Join the Journey!</Components.Title> {/* Overlay title */}
                            <Components.Paragraph>
                                Embark on an adventure of learning and growth. Provide your personal details and let's begin.
                            </Components.Paragraph>
                            <Components.GhostButton onClick={() => toggle(false)}>
                                Register Here
                            </Components.GhostButton>
                        </Components.RightOverlayPanel>

                    </Components.Overlay>

                </Components.OverlayContainer>

            </Components.Container>
        </Components.Body>
    );
}

export default Login_Register; // Export the Login_Register component
