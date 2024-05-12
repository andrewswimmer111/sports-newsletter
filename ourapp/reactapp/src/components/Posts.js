// src/components/Posts.js
import React, { useEffect, useState } from 'react';

function Posts({ userId }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/api/users/${userId}/posts`)
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(error => console.error('Error fetching posts:', error));
  }, [userId]);

  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}

export default Posts;
