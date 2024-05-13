// import React, { useState, useEffect, useContext, createContext } from "react";
import Profiles from "../components/Profiles";
import "./Home.css";
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

  return (
    <main className="layout-container">
      <div className="intro-section">
        <h1 className="intro-title">Welcome to the House Course</h1>
        <p className="intro-subtitle">Time to get to building!</p>

        {/* <CounterState /> */}
        {/* <CounterEffect /> */}
        {/* <TodoList /> */}
        {/* <UserProfile /> */}
        <Profiles />
      </div>
    </main>
  );
}
