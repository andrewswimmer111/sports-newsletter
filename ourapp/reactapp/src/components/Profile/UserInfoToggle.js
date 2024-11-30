import React, { useContext, useState } from 'react';
import { useUser } from '../contexts/UserContext';
import './UserInfoToggle.css';

export default function UserInfoToggle() {
    const { user } = useUser();
    const [isEditing, setIsEditing] = useState(false);

    return (
        <div className="user-info-toggle">
            {isEditing ? (
                <>
                    <h2 className="user-info-toggle__heading">Edit User Info</h2>
                    <EditUserProfile />
                    <button
                        className="user-info-toggle__button cancel-button"
                        onClick={() => setIsEditing(false)}
                    >
                        Cancel
                    </button>
                </>
            ) : (
                <>
                    <h2 className="user-info-toggle__heading">User Info</h2>
                    <div className="user-info-toggle__info">
                        <p className="user-info-toggle__info-item">Name: {user.name}</p>
                        <p className="user-info-toggle__info-item">Email: {user.email}</p>
                    </div>
                    <button
                        className="user-info-toggle__button"
                        onClick={() => setIsEditing(true)}
                    >
                        Edit Info
                    </button>
                </>
            )}
        </div>
    );
}

function EditUserProfile() {
    const { user } = useUser();
    const [formInfo, setFormInfo] = useState({
        name: '',
        email: '',
        newPassword: '',
        confirmPassword: '',
        currentPassword: '',
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormInfo((prevFormInfo) => ({
            ...prevFormInfo,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formInfo.confirmPassword !== formInfo.newPassword) {
            setMessage('Failed, passwords do not match');
        } else {
            try {
                const response = await fetch(`http://localhost:3000/users/${user.id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formInfo),
                });
                if (response.ok) {
                    const updatedUser = await response.json();
                    setMessage(`${updatedUser.message}, refresh to see updates`);
                    localStorage.setItem('user', JSON.stringify(updatedUser.user));
                } else {
                    const errorData = await response.json();
                    setMessage(errorData.error);
                }
            } catch (error) {
                setMessage('An error occurred');
            }
        }
    };

    return (
        <form className="user-info-toggle__form" onSubmit={handleSubmit}>
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
                    name="email"
                    value={formInfo.email}
                    onChange={handleChange}
                />
            </label>
            <label>
                New Password:
                <input
                    type="password"
                    name="newPassword"
                    value={formInfo.newPassword}
                    onChange={handleChange}
                />
            </label>
            <label>
                Confirm New Password:
                <input
                    type="password"
                    name="confirmPassword"
                    value={formInfo.confirmPassword}
                    onChange={handleChange}
                />
            </label>
            <label>
                Current Password:
                <input
                    type="password"
                    name="currentPassword"
                    value={formInfo.currentPassword}
                    onChange={handleChange}
                />
            </label>
            <button className="user-info-toggle__button" type="submit">
                Submit Changes
            </button>
            {message && <div className="user-info-toggle__message">{message}</div>}
        </form>
    );
}
