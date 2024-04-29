import React, { useState, useEffect, useContext } from "react";
import "./UserLanding.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { UserContext } from "../components/contexts/UserContext";
// import bcrypt from 'bcryptjs';



export default function Home() {

  return (
    <main className="main-container">
      {/* <img src={Image}/> */}
      {/* <h1 className="main-title">{question}</h1> */}
      <div className="hero-section">
        <h1 className="hero-title">Welcome to the House Course</h1>
        <p className="hero-subtitle">Find your soulmate today!</p>
        {/* <button className="cta-button">Sign Up Now</button> */}
        {/* User init */}
      </div>
    </main>
  );
}

