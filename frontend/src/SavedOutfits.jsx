import React, { useEffect, useState } from 'react';
import axios from 'axios';

function SavedOutfits({ user }) {
  const [saved, setSaved] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/saved_outfits', {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    }).then(res => setSaved(res.data));
  }, [user]);

  return (
    <div>
      <h3>Saved Outfits</h3>
      <ul>
        {saved.map((outfit, index) => (
          <li key={index}>
            <img src={`data:image/png;base64,${outfit.image}`} alt="Saved Outfit" width="200" />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SavedOutfits;