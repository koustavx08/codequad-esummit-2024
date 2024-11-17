import React, { useState } from "react";
import { auth, googleProvider } from "../firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize navigate for redirection

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      alert("Google Sign-In successful!");
      navigate("/dashboard"); // Redirect to dashboard upon successful login
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Sign in to Your Account</h2>

        <button onClick={handleGoogleLogin} className="google-button">
          <img
            src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA"
            alt="Google Logo"
            className="google-logo"
          />
          Continue with Google
        </button>

        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
