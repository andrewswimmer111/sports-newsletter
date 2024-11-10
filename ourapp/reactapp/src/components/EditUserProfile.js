import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from './contexts/UserContext';

export default function EditUserProfile() {

    const { user } = useContext(UserContext);
    const [formInfo, setFormInfo] = useState({
        name: '',
        email: '',
        newPassword: '',
        confirmPassword: '',
        currentPassword: '',
    });
    const [message, setMessage] = useState('')

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormInfo((prevFormInfo) => ({
            ...prevFormInfo,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formInfo.confirmPassword !== formInfo.newPassword) {
            console.log("NO")
            setMessage('Failed, passwords do not match')
        }
        else {
            console.log('Updated User Info:', formInfo);
        }
      };

    useEffect(()=> {
        console.log(user)
    }, [user])

    return (
        <div>
            Leave a field blank if you do not wish to change it.
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input 
                        type="text" 
                        name="name"
                        value={formInfo.name} 
                        onChange={handleChange} 
                    />
                </label>
                <label>
                    Email:
                    <input 
                        type="email" 
                        name='email'
                        value={formInfo.email} 
                        onChange={handleChange} 
                    />
                </label>
                <label>
                    New Password:
                    <input 
                        type="password" 
                        name='newPassword'
                        value={formInfo.newPassword} 
                        onChange={handleChange} 
                    />
                </label>
                <label>
                    Confirm New Password:
                    <input 
                        type="password" 
                        name='confirmPassword'
                        value={formInfo.confirmPassword} 
                        onChange={handleChange} 
                    />
                </label>
                <label>
                    Current Password:
                    <input 
                        type="password" 
                        name='currentPassword'
                        value={formInfo.currentPassword} 
                        onChange={handleChange} 
                    />
                </label>
                <button type="submit">Submit changes</button>
            </form>
            <div>{message}</div>
        </div>
    )
};