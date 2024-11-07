import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import UserProfile from "./components/UserProfile"; 
import { UserProvider } from "./components/contexts/UserContext";

function App() {
  return (
    // Wrap the Router in the UserProvider
    <UserProvider>  
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<UserProfile />} /> 
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;