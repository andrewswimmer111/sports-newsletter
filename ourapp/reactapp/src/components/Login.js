import React, { useState, useEffect } from 'react';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loginStatus, setLoginStatus] = useState('Please log in');
    const [user, setUser] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log('Logging in with:', { email, password });
    
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
                setLoginStatus(data.message);
                setUser(data.user.email)
            } else {
                const errorData = await response.json();
                setLoginStatus(errorData.error)
            }
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };


    // Run useEffect to fetch data whenever user changes

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} // Update username state
                    required // Makes this field required
                />
                <input
                    type="password" // Change to password type for security
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} // Update password state
                    required // Makes this field required
                />
                <button type="submit">Login</button>
            </form>
            <div> {loginStatus} </div>
            <div> {user} </div>
        </>
    );
}
