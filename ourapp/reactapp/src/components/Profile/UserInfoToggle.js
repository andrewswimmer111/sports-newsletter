import React, { useContext, useState } from 'react';
import { useUser } from '../contexts/UserContext';

export default function UserInfoToggle() {
    const { user } = useUser();
    const [isEditing, setIsEditing] = useState(false);

    return (
        <div>
            {isEditing ? (
                <>
                    <h2>Edit User Info</h2>
                    <EditUserProfile />
                    <button onClick={() => setIsEditing(false)}>Cancel</button>
                </>
            ) : (
                <>
                    <h2>User Info</h2>
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                    <button onClick={() => setIsEditing(true)}>Edit Info</button>
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
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input type="text" name="name" value={formInfo.name} onChange={handleChange} />
            </label>
            <label>
                Email:
                <input type="email" name="email" value={formInfo.email} onChange={handleChange} />
            </label>
            <label>
                New Password:
                <input type="password" name="newPassword" value={formInfo.newPassword} onChange={handleChange} />
            </label>
            <label>
                Confirm New Password:
                <input type="password" name="confirmPassword" value={formInfo.confirmPassword} onChange={handleChange} />
            </label>
            <label>
                Current Password:
                <input type="password" name="currentPassword" value={formInfo.currentPassword} onChange={handleChange} />
            </label>
            <button type="submit">Submit Changes</button>
            <div>{message}</div>
        </form>
    );
}
