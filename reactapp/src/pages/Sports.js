import { useNavigate } from "react-router-dom";
import Banner2 from "../components/Banner2/Banner2";
import { useUser } from "../components/contexts/UserContext";
import SportCard2 from "../components/SportCard2/SportCard2";

import './Sports.css'

export default function Sports() {

    const {user, setUser} = useUser();
    const navigate = useNavigate();

    const signOut = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/users/logout`, {
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
                <button onClick={() => {navigate('/profile')}}> View Profile</button>
                <button onClick={signOut}> Sign out </button>
            </Banner2>
            <main>
                <h2>Welcome back, {user.name.split(' ')[0]}.</h2>
                <h4> Note: Email functionality is currently disabled as the site does not have access to an SMTP server.</h4>
                <SportCard2></SportCard2>
            </main>
        </>
    )
}