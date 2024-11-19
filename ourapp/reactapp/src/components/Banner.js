import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './contexts/UserContext';

export default function Banner() {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const signOut = async () => {
        try {
            const response = await fetch('process.env.REACT_APP_API_URL/users/logout', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                setUser(null); 
            } else {
                const errorData = await response.json();
                console.error('Logout failed:', errorData.error || 'Unknown error');
            }
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    const navigateTo = (path) => {
        navigate(path);
    };

    return (
        <>
            <h1 style={{ marginBottom: '20px' }}> Welcome To Your Custom Sports Newsletter </h1>
            <nav style={{ marginBottom: '10px' }}>
                {user ? (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                        <h2 style={{ marginRight: '10px' }}>Welcome back, {user.name}!</h2>
                        <button onClick={() => navigateTo('/profile')} style={{ fontSize: '18px', fontWeight: 'bold', marginRight: '10px' }}>View Profile</button>
                        <button onClick={signOut} style={{ fontSize: '18px', fontWeight: 'bold' }}>Sign Out</button>
                    </div>
                ) : (
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <button onClick={() => navigateTo('/login')} style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 10px' }}>Sign In</button>
                        <button onClick={() => navigateTo('/register')} style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 10px' }}>Register</button>
                    </div>
                )}
            </nav>
            <p style={{ marginBottom: '10px' }}> Description Here </p>
        </>
    );
}