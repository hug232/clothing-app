import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GoogleLogin } from 'react-google-login';
import './App.css';

// Set up the backend URL (it could be from environment variable or hardcoded for testing)
const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';
const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function App() {
  const [user, setUser] = useState(null);
  const [outfits, setOutfits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle Google login success
  const handleLoginSuccess = (response) => {
    const profile = response.profileObj;
    setUser(profile);
    localStorage.setItem('user', JSON.stringify(profile));
    fetchOutfits(profile.email);
  };

  // Handle Google login failure
  const handleLoginFailure = (error) => {
    console.error('Login failed:', error);
    setError('Google login failed');
  };

  // Fetch outfits from backend
  const fetchOutfits = async (email) => {
    setLoading(true);
    try {
      const response = await axios.get(`${backendUrl}/api/outfits`, { params: { email } });
      setOutfits(response.data.outfits);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching outfits:', err);
      setError('Error fetching outfits');
      setLoading(false);
    }
  };

  // Check if user is already logged in
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
      fetchOutfits(storedUser.email);
    }
  }, []);

  return (
    <div className="App">
      <h1>Outfit Generator</h1>
      
      {/* Google Login */}
      {!user ? (
        <GoogleLogin
          clientId={googleClientId}
          buttonText="Login with Google"
          onSuccess={handleLoginSuccess}
          onFailure={handleLoginFailure}
          cookiePolicy={'single_host_origin'}
        />
      ) : (
        <div>
          <h2>Welcome, {user.name}</h2>
          <button onClick={() => setUser(null)}>Logout</button>
        </div>
      )}

      {/* Display outfits */}
      {loading && <p>Loading outfits...</p>}
      {error && <p className="error">{error}</p>}
      {outfits.length > 0 && (
        <div className="outfit-list">
          {outfits.map((outfit, index) => (
            <div key={index} className="outfit-card">
              <img src={outfit.image_url} alt={outfit.name} />
              <h3>{outfit.name}</h3>
              <p>{outfit.description}</p>
              <a href={outfit.product_url} target="_blank" rel="noopener noreferrer">Shop Now</a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
