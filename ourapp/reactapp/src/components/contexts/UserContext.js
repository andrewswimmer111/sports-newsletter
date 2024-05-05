import React, { createContext, useContext, useState } from 'react';

// Create a UserContext with a default value of null
export const UserContext = createContext({
  user: null,
  setUser: () => {}
});

export const UserProvider = ({ children }) => {
    // What would be a better default value for the user, rather than Alex? 
    // Think about data types and what would be a more appropriate default value.
  const [user, setUser] = useState("Alex");

// return the UserContext.Provider with the user state and setUser function as the value
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
// Export a custom hook that will return the user and setUser function from the UserContext
export const useUser = () => useContext(UserContext);
