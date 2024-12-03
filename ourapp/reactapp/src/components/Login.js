import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './contexts/UserContext';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setUser(data.user);                
                navigate('/'); // Redirect to home page
            } else {
                const errorData = await response.json();
                console.error('Login failed:', errorData.error || 'Unknown error');
            }
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    const signOut = async () => {
        try {
            const response = await fetch('http://localhost:3000/users/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                setUser(null); // Clear the user from context
                navigate('/'); // Redirect to home page
            } else {
                const errorData = await response.json();
                console.error('Logout failed:', errorData.error || 'Unknown error');
            }
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <div>
            {user ? (
                <div>
                    <h2>Welcome back, {user.name}!</h2>
                    <button onClick={signOut}>Sign Out</button>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <h2>Login</h2>
                    <label>
                        Email:
                        <input 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                    </label>
                    <br />
                    <label>
                        Password:
                        <input 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                    </label>
                    <br />
                    <button type="submit">Login</button>
                </form>
            )}
        </div>
    );
}