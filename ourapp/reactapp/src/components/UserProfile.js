import React, { useState } from 'react';
import { useUser } from './contexts/UserContext';
export default function UserProfile() {
  const { user, setUser } = useUser();

  const [newName, setNewName] = useState('');

  // When do you want to update the user's name?
  const handleUpdateName = () => {
    setUser(newName);
    setNewName('');
  };

  return (
    <div>
      <p>{`Hello, ${user || 'Guest'}!`}</p>
      <input
        type="text"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        placeholder="Enter new name"
      />
      <button onClick={handleUpdateName}>Update Name</button>
    </div>
  );
}
