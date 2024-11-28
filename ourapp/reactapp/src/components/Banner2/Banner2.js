import React from 'react';
import './Banner2.css'; 

const Banner2 = ({ children }) => {
    return (
        <div className="banner">
            <div className="banner-logo">CSN</div>
            <div className="banner-buttons">
                {children}
            </div>
        </div>
    );
};

export default Banner2;
