import React, { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import { useHistory } from 'react-router-dom'; // To redirect after successful login
import './Login.css';

const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function Login() {
  const [error, setError] = useState('');
  const history = useHistory(); // React Router for navigation

  // Handle Google login success
  const handleLoginSuccess = (response) => {
    const profile = response.profileObj;
    // Store user data in localStorage
    localStorage.setItem('user', JSON.stringify(profile));
    
    // Redirect to the main page after successful login
    history.push('/dashboard');
  };

  // Handle Google login failure
  const handleLoginFailure = (error) => {
    console.error('Login failed:', error);
    setError('Google login failed. Please try again.');
  };

  return (
    <div className="login-container">
      <h1>Outfit Generator - Login</h1>
      {error && <p className="error">{error}</p>}
      <GoogleLogin
        clientId={googleClientId}
        buttonText="Login with Google"
        onSuccess={handleLoginSuccess}
        onFailure={handleLoginFailure}
        cookiePolicy={'single_host_origin'}
        isSignedIn={true} // Keep user signed in
      />
    </div>
  );
}

export default Login;
