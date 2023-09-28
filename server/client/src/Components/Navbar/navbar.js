import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

export default function Navbar() {
  return (
    <>
      <nav className="nav-bar">
        <div className="logo">
          Notes<span>Share</span>
        </div>
        <ul className="nav-items">
          <li className="nav-item">
            <Link to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/about">About</Link>
          </li>
          <li className="nav-item">
            <Link to="/contact">Contact</Link>
          </li>
          <button className="nav-item userlogin" id="userLoginBtn">
            <Link to="/login">User Login</Link>
          </button>
        </ul>
      </nav>
    </>
  );
}
