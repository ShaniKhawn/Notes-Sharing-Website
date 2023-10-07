import React, { useState, useEffect } from 'react';
import './profile.css';

export default function Profile() {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    role: '',
    image: '',
  });

  useEffect(() => {
    fetch('http://localhost:5000/profile')
      .then((response) => response.json())
      .then((data) => {
        setUserData(data);
      })
      .catch((error) => console.error('Error fetching user data:', error));
  }, []);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData({
          ...userData,
          image: reader.result, // Set the image data as a base64 string
        });
      };
      reader.readAsDataURL(file);
    }
  };


  return (
    <div className="profile-container">
      <h1>My Profile</h1>
      <div className="profile-image">
        <img
          src={userData.image || 'default-image-url.jpg'}
          alt="Profile"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>
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
        <span>{userData.role}</span>
      </div>
    </div>
  );
}
