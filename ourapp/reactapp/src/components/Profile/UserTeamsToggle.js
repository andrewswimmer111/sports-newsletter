import React, { useContext, useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

import './UserTeamsToggle.css';
import TeamCheckbox from '../SportCard2/TeamCheckBox'; // Import the TeamCheckbox component

export default function UserTeamsToggle({ followedTeams }) {
    const [isEditing, setIsEditing] = useState(false);

    return (
        <div className="user-teams-toggle">
            {isEditing ? (
                <>
                    <h2 className="user-teams-toggle__heading">Edit Followed Teams</h2>
                    <EditUserTeams followedTeams={followedTeams} />
                    <button className="user-teams-toggle__button cancel-button" onClick={() => setIsEditing(false)}>Cancel</button>
                </>
            ) : (
                <>
                    <h2 className="user-teams-toggle__heading">Followed Teams</h2>
                    {followedTeams && followedTeams.length > 0 ? (
                        <>
                            <ul className="user-teams-toggle__team-list">
                                {followedTeams.map((team) => (
                                    <li key={team.id} className="user-teams-toggle__team-item">{team.name}</li>
                                ))}
                            </ul>
                            <button className="user-teams-toggle__button" onClick={() => setIsEditing(true)}>Unfollow Teams</button>
                        </>
                    ) : (
                        <p className="user-teams-toggle__no-teams-message">No teams followed</p>
                    )}
                </>
            )}
        </div>
    );
}

function EditUserTeams({ followedTeams }) {
    const { user } = useUser();
    const [selectedTeams, setSelectedTeams] = useState([]);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

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
                navigate(0);
            } else {
                const errorData = await response.json();
                setMessage(errorData.error);
            }
        } catch (error) {
            setMessage('An error occurred');
        }
    };

    return (
        <div className="user-teams-toggle__edit-container">
            <p>Select teams to unfollow:</p>
            {followedTeams && followedTeams.length > 0 ? (
                <>
                        {followedTeams.map((team) => (
                            <TeamCheckbox
                                team={team}
                                onChange={handleTeamSelection}
                            />
                        ))}
                    <button className="user-teams-toggle__button" onClick={handleUnfollowTeamSubmit}>Confirm unfollow</button>
                    <div className="user-teams-toggle__message">{message}</div>
                </>
            ) : (
                <div className="user-teams-toggle__no-teams-message">Currently no followed teams</div>
            )}
        </div>
    );    
}
