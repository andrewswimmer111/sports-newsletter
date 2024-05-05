import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { UserProvider } from "./components/contexts/UserContext";

function App() {
  return (
    // Wrap the Router in the UserProvider
    <UserProvider>  
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
