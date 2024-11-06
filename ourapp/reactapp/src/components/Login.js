import React, { useState, useEffect } from 'react';
import { useUser } from './contexts/UserContext';
import { useNavigate } from 'react-router-dom';


export default function Login() {

    const navigate = useNavigate();
    const handleGoToProfile = () => {
        navigate('/profile');
    }

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loginStatus, setLoginStatus] = useState('Please log in');

    const [sportsData, setSportsData] = useState("Login to see your sports teams");
    const [teams, setTeams] = useState([]);

    const {user, setUser} = useUser();

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
                console.log(data)
                setUser({id: data.user.id, name: data.user.name, email: data.user.email});
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
                const sportsData = await fetch(`http://localhost:3000/users/${user.id}/get_teams/`);

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
            <div> {user.name} </div>
            <br/>
            <ul>
                {teams.map((team, index) => (
                    <li key={index}>{team}</li>
                ))}
            </ul>

            <button onClick={handleGoToProfile}> Go to CRUD </button>
            
        </>
    );
}
