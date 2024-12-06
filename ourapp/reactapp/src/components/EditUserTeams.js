import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from './contexts/UserContext';



export default function EditUserTeams({ followed_teams }) {

    const { user } = useContext(UserContext);
    const [selectedTeams, setSelectedTeams] = useState([]);
    const [message, setMessage] = useState('');

    console.log("here")
    console.log(followed_teams)

    const handleTeamSelection = (event) => {
        const teamId = event.target.value;
        setSelectedTeams(prevSelectedTeams =>
            prevSelectedTeams.includes(teamId)
                ? prevSelectedTeams.filter(id => id !== teamId)
                : [...prevSelectedTeams, teamId]
        );
    };

    const handleUnfollowTeamSubmit = async(e) => {
        const response = await fetch('http://localhost:3000/user_teams/unfollow', {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_teams: {
                    user_id: user.id,
                    team_ids: selectedTeams
                }
            }),
        });
        if (response.ok) {
            const confirmation = await response.json();
            console.log(confirmation.message)
            setMessage(confirmation.message)
        } else {
            const errorData = await response.json();
            setMessage(errorData.error)
        }
    }

    return (
        <div>
            Select teams to unfollow
            {followed_teams.map(team => (
                <li key={team.id} style={{ listStyleType: 'none', display: 'flex', alignItems: 'center' }}>
                    <label style={{ display: 'flex', alignItems: 'center' }}>
                        <input
                            type="checkbox"
                            value={team.id}
                            onChange={handleTeamSelection}
                            style={{ marginRight: '10px' }}
                        />
                        {team.name}
                    </label>
                </li>
            ))}
            <button onClick={handleUnfollowTeamSubmit}> Unfollow teams </button>
            <div> {message} </div>
        </div>
    )
};