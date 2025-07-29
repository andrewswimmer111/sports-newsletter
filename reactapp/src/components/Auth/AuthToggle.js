import React, { useState, useEffect } from 'react';
import Register from './Register2';
import Login from './Login2';

export default function AuthToggle( {isLogin} ) {
  const [isRegistering, setIsRegistering] = useState(!isLogin);

  useEffect(() => {
    setIsRegistering(!isLogin);
  }, [isLogin]);

  return (
    <div className='auth-container'>
      <div className="toggle-container">
        <span
          className={`toggle-tag ${!isRegistering ? 'active' : ''}`}
          onClick={() => setIsRegistering(false)}
        >
          Log In
        </span>
        <span
          className={`toggle-tag ${isRegistering ? 'active' : ''}`}
          onClick={() => setIsRegistering(true)}
        >
          Sign Up
        </span>
      </div>
      {isRegistering ? <Register /> : <Login />}
    </div>
  );
}
