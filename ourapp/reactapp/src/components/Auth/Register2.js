import React, { useState, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import './AuthComponents.css';  
import { useNavigate } from 'react-router-dom';

export default function Register2() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registerStatus, setRegisterStatus] = useState('');
  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(JSON.stringify({ name: firstName + ' ' + lastName, email, password }))
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name: firstName + ' ' + lastName, 
          email, 
          password 
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        navigate('/sports');
      } else {
        const errorData = await response.json();
        setRegisterStatus(errorData.error || 'Sorry, registration failed');
      }
    } catch (error) {
      setRegisterStatus(error.message);
    }
  };

  return (
    <div className="auth-form-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit} className='form'>
        <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
        <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value.toLowerCase())} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Register</button>
      </form>
      {registerStatus && <div className="status">{registerStatus}</div>}
    </div>
  );
}
