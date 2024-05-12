
// src/components/User.js
import React from 'react';
import Posts from './Posts';

function User({ user }) {
  return (
    <div>
      <h2>{user.name} - {user.email}</h2>
      <Posts userId={user.id} />
    </div>
  );
}

export default User;

