import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css"
import { useNavigate } from "react-router-dom";

export default function UserNavbar() {
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName");

  return (
    <>
      <nav className="nav-bar bg-color" id="navbar1">
        <div className="logo">
          Notes<span>Share</span>
        </div>
        <ul className="nav-items">
          <li className="nav-item">
            <Link to="/user">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/user/upload">Upload Notes</Link>
          </li>
          <li className="nav-item">
            <Link to="/user/viewallnotes">View All Notes</Link>
          </li>
          <li className="nav-item">
            <Link to="/user/mynotes">My Notes</Link>
          </li>
          <li className="nav-item" id="welcomeUser">Welcome, {userName}
          <div className="dropdown">
            <ul className="dropdown-content">
              <li>
                <Link to="/profile">Profile</Link>
              </li>
            </ul>
          </div>
          </li>
        </ul>
        <button id="logoutBtn" onClick={() => navigate("/")}>
          Logout
        </button>
      </nav>
    </>
  );
}
