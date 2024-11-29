import React, { useContext, useState } from 'react';
import { useUser } from '../contexts/UserContext';

export default function UserTeamsToggle({ followedTeams }) {
    const [isEditing, setIsEditing] = useState(false);

    return (
        <div>
            {isEditing ? (
                <>
                    <h2>Edit Followed Teams</h2>
                    <EditUserTeams followedTeams={followedTeams} />
                    <button onClick={() => setIsEditing(false)}>Cancel</button>
                </>
            ) : (
                <>
                    <h2>Followed Teams</h2>
                    {followedTeams && followedTeams.length > 0 ? (
                        <ul>
                            {followedTeams.map((team) => (
                                <li key={team.id}>{team.name}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>No teams followed</p>
                    )}
                    <button onClick={() => setIsEditing(true)}>Unfollow Teams</button>
                </>
            )}
        </div>
    );
}

function EditUserTeams({ followedTeams }) {
    const { user } = useUser();
    const [selectedTeams, setSelectedTeams] = useState([]);
    const [message, setMessage] = useState('');

    const handleTeamSelection = (event) => {
        const teamId = event.target.value;
        setSelectedTeams((prevSelectedTeams) =>
            prevSelectedTeams.includes(teamId)
                ? prevSelectedTeams.filter((id) => id !== teamId)
                : [...prevSelectedTeams, teamId]
        );
    };

    const handleUnfollowTeamSubmit = async () => {
        try {
            const response = await fetch(`http://localhost:3000/user_teams/unfollow`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_teams: {
                        user_id: user.id,
                        team_ids: selectedTeams,
                    },
                }),
            });
            if (response.ok) {
                const confirmation = await response.json();
                setMessage(confirmation.message);
            } else {
                const errorData = await response.json();
                setMessage(errorData.error);
            }
        } catch (error) {
            setMessage('An error occurred');
        }
    };

    return (
        <div>
            <p>Select teams to unfollow:</p>
            {followedTeams && followedTeams.length > 0 ? (
                <>
                    {followedTeams.map((team) => (
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
                    <button onClick={handleUnfollowTeamSubmit}>Unfollow Teams</button>
                    <div>{message}</div>
                </>
            ) : (
                <div>Currently no followed teams</div>
            )}
        </div>
    );    
}
