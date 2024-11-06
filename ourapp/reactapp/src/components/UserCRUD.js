import { useUser } from './contexts/UserContext';
import { useEffect } from 'react';

export default function UserEdit() {

    const { user, setUser } = useUser();

    // Fetch the data (still need to update dependencies)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await fetch(`http://localhost:3000/users/${user.id}`)

                if (userData.ok) {
                    const data = await userData.json();
                    console.log(data);
                }
                else {
                    const errorData = await userData.json();
                    console.log(errorData)
                }
            }
            catch (error) {
                console.error('Error fetching user data:', error);
            }
        }
        fetchData();
      }, [user.id]);
}