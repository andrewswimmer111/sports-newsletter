import { useState, useEffect } from "react";
import UserInfoToggle from "../components/Profile/UserInfoToggle";
import UserTeamsToggle from "../components/Profile/UserTeamsToggle";
import { useUser } from "../components/contexts/UserContext";
import Banner2 from "../components/Banner2/Banner2";
import { useNavigate } from "react-router-dom";

import './Profile.css'

export default function Profile() {

    const [teams, setTeams] = useState([]);
    const { user, setUser } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
          fetch(`http://localhost:3000/users/${user.id}/get_teams`)
                .then(response => response.json())
                .then(data => setTeams(data.teams))
                .catch(error => console.error('Error fetching teams:', error));
        }
    }, [user]);

    const signOut = async () => {
        try {
            const response = await fetch('http://localhost:3000/users/logout', {
                method: 'DELETE',
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
        <>
            <Banner2>
                <button onClick={() => {navigate('/sports')}}> View Teams </button>
                <button onClick={signOut}> Sign out </button>
            </Banner2>
            <main>
                <UserInfoToggle></UserInfoToggle>
                <UserTeamsToggle followedTeams={teams} />
            </main>
        </>
    )
}