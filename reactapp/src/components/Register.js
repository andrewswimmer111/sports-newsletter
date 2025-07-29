import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './contexts/UserContext';

export default function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registerStatus, setRegisterStatus] = useState('');
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Registering with:', { email, password });

    // Register function
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies in the request
        body: JSON.stringify({ name: firstName + ' ' + lastName, email, password }), // Include name in the body
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user); // Set the registered user in context
        navigate('/'); // Redirect to home page
      } else {
        const errorData = await response.json();
        console.error('Registration failed:', errorData.error || 'Unknown error');
        setRegisterStatus('Registration failed: ' + (errorData.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error registering:', error);
      setRegisterStatus('Error registering: ' + error.message);
    }
  };

  return (
    <>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)} // Update first name state
          required // Makes this field required
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)} // Update last name state
          required // Makes this field required
        />
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Update email state
          required // Makes this field required
        />
        <input
          type="password" // Change to password type for security
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Update password state
          required // Makes this field required
        />
        <button type="submit">Register</button>
      </form>
      <div>{registerStatus}</div>
    </>
  );
}