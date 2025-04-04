import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './OutfitGenerator.css';

const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

function OutfitGenerator() {
  const [user, setUser] = useState(null);
  const [outfit, setOutfit] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Function to fetch the outfit based on user's preferences
  const generateOutfit = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${backendUrl}/api/generate-outfit`);
      setOutfit(response.data.outfit); // Assume backend returns an "outfit" object
      setLoading(false);
    } catch (err) {
      console.error('Error generating outfit:', err);
      setError('Error generating outfit. Please try again.');
      setLoading(false);
    }
  };

  // Fetch user data from localStorage on component mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    } else {
      setError('Please log in to generate an outfit.');
    }
  }, []);

  return (
    <div className="outfit-generator-container">
      <h1>Generate Your Outfit</h1>

      {/* Display error or loading */}
      {error && <p className="error">{error}</p>}
      {loading && <p>Loading your outfit...</p>}

      {/* Display the generated outfit */}
      {outfit && (
        <div className="outfit-card">
          <h2>Your Outfit</h2>
          <img src={outfit.image_url} alt="Outfit" />
          <h3>{outfit.name}</h3>
          <p>{outfit.description}</p>
          <a href={outfit.product_url} target="_blank" rel="noopener noreferrer">
            Shop Now
          </a>
        </div>
      )}

      {/* Button to generate a new outfit */}
      <button onClick={generateOutfit} disabled={loading}>
        {loading ? 'Generating...' : 'Generate Outfit'}
      </button>
    </div>
  );
}

export default OutfitGenerator;
