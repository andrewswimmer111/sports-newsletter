import React, { useState, useEffect } from 'react';
import { useUser } from './contexts/UserContext';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loginStatus, setLoginStatus] = useState('Please log in');
    const [user, setUser] = useState()

    const [sportsData, setSportsData] = useState("Login to see your sports teams");
    const [teams, setTeams] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log('Logging in with:', { email, password });
    
        try {
            const loginResponse = await fetch('http://localhost:3000/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email, 
                    password: password,
                }),
            });
    
            if (loginResponse.ok) {
                const data = await loginResponse.json();
                setLoginStatus(data.message);
                setUser(data.user.id);
                setTeams([]);
            } 
            else {
                const errorData = await loginResponse.json();
                setLoginStatus(errorData.error)
            }
        } 
        catch (error) {
            console.error('Error logging in:', error);
        }
    };

    // Run useEffect to fetch data whenever user changes
    useEffect(() => {
        const fetchData = async () => {
            try {
                const sportsData = await fetch(`http://localhost:3000/users/${user}/get_teams/`);

                if (sportsData.ok) {
                    const data = await sportsData.json();
                    for (let i = 0; i < data.teams.length; i++) {
                        let newTeam = data.teams[i].name
                        setTeams((prevTeams) => [...prevTeams, newTeam]);
                    }
                } 
                else {
                    const errorData = await sportsData.json();
                    setSportsData(errorData.error);
                }
            }
            catch (error) {
                console.error('Error logging in:', error);
            }
        }

        fetchData()
    }, [user])

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
            <br/>
            <div> {teams} </div>
            
        </>
    );
}
