// Import React and useState hook for state management
import React, { useState } from "react";

// Import styled components from '../SassyCSS/stylescomp'
import * as Components from '../SassyCSS/stylescomp';

// Import useNavigate hook from react-router-dom for navigation
import { useNavigate } from 'react-router-dom';

// Import Firebase authentication functions
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";

// Import ToastContainer and toast for notifications
// Import Toastify CSS for styling notifications
import { toast, toastContainer } from '../toastservice';

// Import Firebase auth and Firestore database
import { auth, db } from '../firebase';

// Import Firestore functions for interacting with Firestore
import { doc, setDoc, updateDoc } from "firebase/firestore";

// Define the Login_Register functional component
function Login_Register() {
    // State variables for registration and login form inputs
    const [signIn, toggle] = useState(true); // State to toggle between sign in and register
    const [remail, setRemail] = useState(""); // State for register email
    const [rpass, setRpass] = useState(""); // State for register password
    const [rconpass, setRconpass] = useState(""); // State for register confirm password
    const [lemail, setLemail] = useState(""); // State for login email
    const [lpass, setLpass] = useState(""); // State for login password

    const navigate = useNavigate(); // Initialize navigate function for routing

    // Function to reset all form inputs
    const resetForm = () => {
        setRemail(""); // Reset register email
        setRpass(""); // Reset register password
        setRconpass(""); // Reset register confirm password
        setLemail(""); // Reset login email
        setLpass(""); // Reset login password
    };

    // Function to validate email format
    const validateEmail = (email) => /^[0-9]+(staff)?@(gmail\.com)$/.test(String(email).toLowerCase());

    // Function to handle registration process
    const handleRegister = async (e) => {
        e.preventDefault(); // Prevent default form submission

        const trimmedEmail = remail.trim(); // Trim register email
        const trimmedPass = rpass.trim(); // Trim register password
        const trimmedConPass = rconpass.trim(); // Trim register confirm password

        // Validate email format
        if (!validateEmail(trimmedEmail)) {
            toast.error("Please enter a valid Email_id...! Should be '123@gmail.com' Only.", { autoClose: 2500 });
            resetForm();
            return;
        }

        // Validate password length
        if (trimmedPass.length < 6) {
            toast.error("Password should not be less than 6 characters...!", { autoClose: 2500 });
            resetForm();
            return;
        }

        // Validate confirm password length
        if (trimmedConPass.length < 6) {
            toast.error("Confirm Password should not be less than 6 characters...!", { autoClose: 2500 });
            resetForm();
            return;
        }

        // Validate if passwords match
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
                resetForm(); // Reset form inputs
            }, 2500);
        } catch (error) {
            toast.error(`Registration Unsuccessful. Error message: ${error.message}`, { autoClose: 2500 });
            resetForm(); // Reset form inputs on error
        }
    };

    // Function to handle login process
    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent default form submission
        const trimmedEmail = lemail.trim(); // Trim login email
        const trimmedPass = lpass.trim(); // Trim login password

        try {
            const userCredential = await signInWithEmailAndPassword(auth, trimmedEmail, trimmedPass); // Sign in with email and password
            const user = userCredential.user; // Get user data

            await updateDoc(doc(db, "AuthDetails", user.uid), {
                signedIn: user.metadata.lastSignInTime // Update last sign-in time in Firestore
            });

            toast.success("Logged in Successfully...!", { autoClose: 2500 });
            setTimeout(() => {
                if (trimmedEmail === "ecpms@gmail.com") { // Check if user is admin
                    navigate('/UserCred'); // Navigate to admin page
                } else if (trimmedEmail.includes("staff") && trimmedEmail.endsWith("@gmail.com")) { // Check if user is staff
                    navigate('/ListOfStudents'); // Navigate to staff page
                } else {
                    navigate('/ViewProfile'); // Navigate to profile page for students
                }
            }, 2500);
        } catch (error) {
            toast.error(`Login Unsuccessful. Error message: ${error.message}`, { autoClose: 2500 });
            resetForm(); // Reset form inputs on error
        }
    };

    // Function to handle forgot password process
    const handleForgotPassword = async (e) => {
        e.preventDefault(); // Prevent default form submission
        const trimmedEmail = lemail.trim(); // Trim login email

        if (!trimmedEmail) {
            toast.error("Please enter your email address to reset password.", { autoClose: 2500 });
            resetForm(); // Reset form inputs
            return;
        }

        try {
            await sendPasswordResetEmail(auth, trimmedEmail); // Send password reset email
            toast.success("Password reset email sent successfully.", { autoClose: 2500 });
            resetForm(); // Reset form inputs
        } catch (error) {
            toast.error(`Error sending password reset email: ${error.message}`, { autoClose: 2500 });
            resetForm(); // Reset form inputs on error
        }
    };

    // Return JSX for Login_Register component
    return (
        <Components.Body>
            {/* Back to home button */}
            <Components.BackButton onClick={() => navigate('/')}>Back to Home</Components.BackButton>

            {/* Toast container for displaying notifications */}
            {toastContainer}

            {/* Container for login and registration forms */}
            <Components.Container>
                {/* Sign up container */}
                <Components.SignUpContainer signinIn={signIn}>
                    {/* Register form */}
                    <Components.Form onSubmit={handleRegister}>
                        {/* Register form title */}
                        <Components.Title>Get Onboard</Components.Title>

                        {/* Register email input */}
                        <Components.Input type='email' placeholder='Enter Email Id' value={remail} onChange={(e) => setRemail(e.target.value)} required />

                        {/* Register password input */}
                        <Components.Input type='password' placeholder='Enter Password' value={rpass} onChange={(e) => setRpass(e.target.value)} required />

                        {/* Register confirm password input */}
                        <Components.Input type='password' placeholder='Confirm Password' value={rconpass} onChange={(e) => setRconpass(e.target.value)} required />

                        {/* Register button */}
                        <Components.Button type="submit">Register Today</Components.Button>
                    </Components.Form>
                </Components.SignUpContainer>

                {/* Sign in container */}
                <Components.SignInContainer signinIn={signIn}>
                    {/* Login form */}
                    <Components.Form onSubmit={handleLogin}>
                        {/* Login form title */}
                        <Components.Title>Authenticate</Components.Title>

                        {/* Login email input */}
                        <Components.Input type='email' placeholder='Enter Email Id' value={lemail} onChange={(e) => setLemail(e.target.value)} required />

                        {/* Login password input */}
                        <Components.Input type='password' placeholder='Enter Password' value={lpass} onChange={(e) => setLpass(e.target.value)} required />

                        {/* Forgot password link */}
                        <Components.Anchor href='#' onClick={handleForgotPassword}>Forgot your password...!</Components.Anchor>

                        {/* Login button */}
                        <Components.Button type="submit">LogIn</Components.Button>
                    </Components.Form>
                </Components.SignInContainer>

                {/* Overlay container for sign in and register toggle */}
                <Components.OverlayContainer signinIn={signIn}>
                    {/* Overlay content */}
                    <Components.Overlay signinIn={signIn}>
                        {/* Left overlay panel */}
                        <Components.LeftOverlayPanel signinIn={signIn}>
                            {/* Overlay title */}
                            <Components.Title>Unlock Your Potential!</Components.Title>

                            {/* Overlay paragraph */}
                            <Components.Paragraph>
                                Dive into a world of opportunities. Sign in with your credentials to explore your future.
                            </Components.Paragraph>

                            {/* Ghost button to toggle to login */}
                            <Components.GhostButton onClick={() => toggle(true)}>
                                Log In
                            </Components.GhostButton>
                        </Components.LeftOverlayPanel>

                        {/* Right overlay panel */}
                        <Components.RightOverlayPanel signinIn={signIn}>
                            {/* Overlay title */}
                            <Components.Title>Join the Journey!</Components.Title>

                            {/* Overlay paragraph */}
                            <Components.Paragraph>
                                Embark on an adventure of learning and growth. Provide your personal details and let's begin.
                            </Components.Paragraph>

                            {/* Ghost button to toggle to register */}
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

// Export the Login_Register component as the default export
export default Login_Register;
