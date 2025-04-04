import React, { useState } from 'react';
import axios from 'axios';

function OutfitGenerator({ user }) {
  const [style, setStyle] = useState('');
  const [color, setColor] = useState('');
  const [brand, setBrand] = useState('');
  const [budget, setBudget] = useState({ min: '', max: '' });
  const [outfit, setOutfit] = useState(null);

  const handleGenerate = async () => {
    const res = await axios.post('http://localhost:5000/generate_outfit', {
      style, color, brand, budget
    });
    setOutfit(res.data);
  };

  const handleSave = async () => {
    await axios.post('http://localhost:5000/save_outfit', {
      outfit
    }, {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    });
  };

  return (
    <div>
      <input value={style} onChange={(e) => setStyle(e.target.value)} placeholder="Style" />
      <input value={color} onChange={(e) => setColor(e.target.value)} placeholder="Color" />
      <input value={brand} onChange={(e) => setBrand(e.target.value)} placeholder="Brand" />
      <input type="number" placeholder="Min $" onChange={e => setBudget({ ...budget, min: e.target.value })} />
      <input type="number" placeholder="Max $" onChange={e => setBudget({ ...budget, max: e.target.value })} />
      <button onClick={handleGenerate}>Generate Outfit</button>
      {outfit && (
        <div>
          <img src={`data:image/png;base64,${outfit.image}`} alt="Outfit" />
          <button onClick={handleSave}>Save Outfit</button>
        </div>
      )}
    </div>
  );
}

export default OutfitGenerator;