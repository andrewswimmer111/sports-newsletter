import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home2 from "./pages/Home2";
import Login from "./components/Login";
import Register from "./components/Register";
import UserProfile from "./components/UserProfile"; 
import { UserProvider } from "./components/contexts/UserContext";

import './App.css'

function App() {
  return (
    // Wrap the Router in the UserProvider
    <UserProvider>  
      <Router>
        <Routes>
          <Route path="/" element={<Home2 />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<UserProfile />} /> 
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;