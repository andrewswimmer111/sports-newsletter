import React, { createContext, useContext, useEffect, useState } from 'react';

// Create a UserContext with a default value of null
export const UserContext = createContext({
  user: null,
  setUser: () => {},
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [loading, setLoading] = useState(true); // Loading state

  const setUserAndStore = (user) => {
    setUser(user);
    if (user) {
        localStorage.setItem('user', JSON.stringify(user));
    } else {
        localStorage.removeItem('user');
    }
};

  // Fetch the current user when the component mounts
  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (!user) {
        try {
          const response = await fetch('process.env.REACT_APP_API_URL/users/current_user', {
            method: 'GET',
            credentials: 'include', // Include cookies in the request
          });

          if (response.ok) {
            const data = await response.json();
            setUser(data.user); // Set the current user in context
          } else {
            setUser(null); // No user is logged in
          }
        } catch (error) {
          console.error('Error fetching current user:', error);
          setUser(null);
        } finally {
          setLoading(false); // Loading is done
        }
      }
    };
    fetchCurrentUser();
  }, []);

  // Return the UserContext.Provider with the user state and setUser function as the value
  return (
    <UserContext.Provider value={{ user, setUser: setUserAndStore}}>
      {children}
    </UserContext.Provider>
  );
};

// Export a custom hook that will return the user and setUser function from the UserContext
export const useUser = () => useContext(UserContext);