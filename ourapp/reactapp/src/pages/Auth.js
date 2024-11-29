import React, { useState, useEffect } from 'react';
import './Auth.css'; 
import AuthToggle from '../components/Auth/AuthToggle';
import Banner2 from "../components/Banner2/Banner2";
import { useLocation, useNavigate } from 'react-router-dom';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Get the 'form' query parameter from the URL
    const queryParams = new URLSearchParams(location.search);
    const formType = queryParams.get('form');
    if (formType === 'login') {
      setIsLogin(true);
    }
    else {
      setIsLogin(false);
    }
  }, [location]);

  return (
    <>
      <Banner2>
        <button onClick = {() => navigate('/')}> Home </button>
      </Banner2>
      <main className='auth-main'>
        <AuthToggle isLogin={isLogin}/>
      </main>
    </>
  );
}
