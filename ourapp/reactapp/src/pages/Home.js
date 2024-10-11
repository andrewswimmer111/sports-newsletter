// import React, { useState, useEffect, useContext, createContext } from "react";
import "./Home.css";
import Login from "../components/Login";

// import axios from "axios";
// import { Link } from "react-router-dom";
// import { UserContext } from "../components/contexts/UserContext";

// Be sure to add imports for the components you want to use!
// import TodoList from "../components/ToDo";
// import Counter from "../components/CounterState";
// import CounterEffect from "../components/CounterEffect";
// import CounterState from "../components/CounterState";

// Add back in when working on UserTest:
// import UserProfile from "../components/UserProfile";

export default function Home() {
  // Add back in when working on UserTest:
  // const user = useContext(UserContext);

  return (
    <main className="layout-container">
      <div className="intro-section">
        <Login/>
      </div>
    </main>
  );
}
