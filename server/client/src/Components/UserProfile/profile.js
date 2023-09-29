import React from 'react';
import './profile.css';

function UserProfile() {

  return (
    <div className="user-profile">
      <h2>User Profile</h2>
      <form className="profile-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="role">Role:</label>
          <input
            type="text"
            name="role"
          />
        </div>

        <button>
          Update Profile
        </button>
        
      </form>
    </div>
  );
}

export default UserProfile;
