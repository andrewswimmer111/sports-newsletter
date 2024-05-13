// src/components/Users.js
import React, { useEffect, useState } from 'react';

function Profiles() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/users')
      .then(response => {
        if (!response.ok) throw new Error('Failed to fetch');
        return response.json();
      })
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {users.map(user => (
        <div key={user.id}>
          <h2>{user.name}</h2>
          <ul>
            {/* {user.posts.map(post => ( */}
              {/* <li key={post.id}>{post.title}</li> */}
            {/* ))} */}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Profiles;
