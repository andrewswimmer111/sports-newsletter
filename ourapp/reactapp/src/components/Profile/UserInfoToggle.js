import React, { useContext, useState } from 'react';
import { useUser } from '../contexts/UserContext';
import './UserInfoToggle.css';
import { useNavigate } from 'react-router-dom';

export default function UserInfoToggle() {
    const navigate = useNavigate();
    const { user, setUser } = useUser();
    const [isEditing, setIsEditing] = useState(false);
    const [message, setMessage] = useState("")

    const handleDelete = async () => {

        const confirmation = window.confirm("Are you sure you want to delete your account? This action cannot be undone. If you continue, your account will be deleted and you will be redirected to the homepage.");
  
        if (!confirmation) {
            return; // Exit if the user cancels
        }

        try {
          const response = await fetch(`http://localhost:3000/users/${user.id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          });
      
          if (response.ok) {
            const data = await response.json();
            setUser(null);
            navigate("/");
          } else {
            const errorData = await response.json();
            setMessage(errorData.error);  // Show the error message
          }
        } catch (error) {
          console.log(error);
          setMessage('An error occurred');
        }
    };

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
                    <div className='buttons'>
                        <button
                            className="user-info-toggle__button"
                            onClick={() => setIsEditing(true)}
                        >
                            Edit Info
                        </button>
                        <button 
                            className="user-info-toggle__button delete"
                            onClick={handleDelete}
                        >
                            Delete Account
                        </button>
                    </div>
                    {message && <div className="user-info-toggle__message">{message}</div>}
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

    const navigate = useNavigate();

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
            console.log(JSON.stringify(formInfo))
            try {
                const response = await fetch(`http://localhost:3000/users/${user.id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        user: {
                            id: user.id,
                            name: formInfo.name,
                            email: formInfo.email,
                            newPassword: formInfo.newPassword,
                            confirmPassword: formInfo.confirmPassword,
                            currentPassword: formInfo.currentPassword,
                        }
                    }),
                });

                if (response.ok) {
                    const updatedUser = await response.json();
                    navigate(0);
                    console.log('success');
                    localStorage.setItem('user', JSON.stringify(updatedUser.user));
                } else {
                    const errorData = await response.json();
                    console.log('Error:', errorData);
                    // Check if errors exist in the response
                    if (errorData.errors) {
                        setMessage(errorData.errors.join(", "));
                    } else {
                        setMessage('An error occurred');
                    }
                }
            } catch (error) {
                console.log(error);
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
                    value={formInfo.email.toLowerCase()}
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
