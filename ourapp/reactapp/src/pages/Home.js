import React, { useState, useEffect, useContext } from "react";
import "./Home.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { UserContext } from "../components/contexts/UserContext";
// Be sure to add imports for the components you want to use!
import TodoList from "../components/ToDo";

export default function Home() {
  return (
    <main className="layout-container">
      <div className="intro-section">
        <h1 className="intro-title">Welcome to the House Course</h1>
        <p className="intro-subtitle">Time to get to building!</p>
        <TodoList />
      </div>
    </main>
  );
}
