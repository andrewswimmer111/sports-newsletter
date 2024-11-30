import React from 'react';
import './Banner2.css'; 
import { useNavigate } from 'react-router-dom';

const Banner2 = ({ children }) => {

    const navigate = useNavigate();

    return (
        <div className="banner">
            <div className="banner-logo" onClick={() => {navigate('/')}}>CSN</div>
            <div className="banner-buttons">
                {children}
            </div>
        </div>
    );
};

export default Banner2;
