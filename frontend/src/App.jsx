import React, { useState } from 'react';
import OutfitGenerator from './OutfitGenerator';
import SavedOutfits from './SavedOutfits';
import Login from './Login';

function App() {
  const [user, setUser] = useState(null);

  return (
    <div>
      {!user ? <Login onLogin={setUser} /> : (
        <>
          <h2>Welcome, {user.name}</h2>
          <OutfitGenerator user={user} />
          <SavedOutfits user={user} />
        </>
      )}
    </div>
  );
}

export default App;