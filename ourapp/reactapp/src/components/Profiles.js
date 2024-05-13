import React, { useEffect, useState } from 'react';
import './Profiles.css';
function Profiles() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/users')
      .then(response => {
        if (!response.ok) throw new Error('Failed to fetch users');
        return response.json();
      })
      .then(data => {
        const usersWithPostsPromises = data.map(user => {
          return fetch(`http://localhost:3000/users/${user.id}/posts`)
            .then(response => {
              if (!response.ok) throw new Error('Failed to fetch posts');
              return response.json();
            })
            .then(posts => {
              return { ...user, posts }; // Append posts to each user
            });
        });
        return Promise.all(usersWithPostsPromises); // Resolve all promises
      })
      .then(usersWithPosts => {
        setUsers(usersWithPosts);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">Error: {error}</p>;

  return (
    <div className="Profiles-container">
      {users.map(user => (
        <div key={user.id} className="user-card">
          <h2>{user.name}</h2>
          <ul>
            {user.posts && user.posts.map(post => (
              <li key={post.id}>{post.title}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
export default Profiles;
