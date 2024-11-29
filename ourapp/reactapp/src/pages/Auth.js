import React, { useState } from 'react';
import './Auth.css'; 
import AuthToggle from '../components/Auth/AuthToggle';
import Banner2 from "../components/Banner2/Banner2";
import { useNavigate } from 'react-router-dom';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  const navigate = useNavigate();

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <>
      <Banner2>
        <button onClick = {() => navigate('/')}> Home </button>
      </Banner2>
      <main className='auth-main'>
        <AuthToggle></AuthToggle>
      </main>
    </>
  );
}
