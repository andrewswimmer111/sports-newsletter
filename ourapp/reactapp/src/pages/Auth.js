import React, { useState } from 'react';
import './Auth.css'; 
import AuthToggle from '../components/Auth/AuthToggle';
import Banner2 from "../components/Banner2/Banner2";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <>
      <Banner2>
        <button> Home </button>
      </Banner2>
      <main className='auth-main'>
        <AuthToggle></AuthToggle>
      </main>
    </>
  );
}
