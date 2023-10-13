import React, { useState, useEffect } from 'react';
import './profile.css';

export default function Profile() {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    role: '',
  });

  useEffect(() => {
    const userId = localStorage.getItem('user');

    if (!userId) {
      console.error('User ID not found in local storage');
      return;
    }

    fetch(`http://localhost:5000/login/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setUserData({
          name: data.name,
          email: data.email,
          role: data.isAdmin ? 'Admin' : 'User',
        });
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  return (
    <div className="profile-container">
      <h1>My Profile</h1>
      <div className="profile-field">
        <label>Name:</label>
        <span>{userData.name}</span>
      </div>
      <div className="profile-field">
        <label>Email:</label>
        <span>{userData.email}</span>
      </div>
      <div className="profile-field">
        <label>Role:</label>
        <span style={{ marginInline: '20px' }}>{userData.role}</span>
      </div>
    </div>
  );
}
