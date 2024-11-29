import React, { useState, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import './AuthComponents.css';  // Import shared CSS

export default function Login2() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState('');

  const { setUser } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        navigate('/sports');
        // Redirect to home page or wherever needed
      } else {
        const errorData = await response.json();
        setLoginStatus(errorData.error || 'Sorry, login failed');

      }
    } catch (error) {
      setLoginStatus(error.message);
    }
  };

  return (
    <div className="auth-form-container">
      <h2>Log In</h2>
      <form onSubmit={handleSubmit} className='form'>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
      {loginStatus && <div className="status">{loginStatus}</div>}
    </div>
  );
}
