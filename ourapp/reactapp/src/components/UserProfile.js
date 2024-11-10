import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './contexts/UserContext';
import EditUserProfile from './EditUserProfile';
import EditUserTeams from './EditUserTeams';

export default function UserProfile() {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        if (user) {
          fetch(`http://localhost:3000/users/${user.id}/get_teams`)
                .then(response => response.json())
                .then(data => setTeams(data.teams))
                .catch(error => console.error('Error fetching teams:', error));
        }
    }, [user]);

    if (!user) {
        return <p>No user data available</p>;
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <h1>User Profile</h1>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            {/* Add more user information as needed */}
            <h2>Teams Followed</h2>
            {teams && teams.length > 0 ? (
                <ul>
                    {teams.map(team => (
                        <li key={team.id}>{team.name}</li>
                    ))}
                </ul>
            ) : (
                <p>No teams followed</p>
            )}
            <button onClick={() => navigate('/')} style={{ fontSize: '18px', fontWeight: 'bold', marginTop: '20px' }}>Home</button>
            
            <div> See below</div>
            <EditUserProfile/>
            <EditUserTeams followed_teams={teams}/>

        </div>
    );
}