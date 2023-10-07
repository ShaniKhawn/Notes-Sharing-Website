import React from "react";
import { NavLink } from "react-router-dom";
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
            <NavLink to="/">Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/about">About</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/contact">Contact</NavLink>
          </li>
        </ul>
        <button className="nav-item btn-login" id="userLoginBtn" >
            <NavLink to="/signup">Register</NavLink>
          </button>
          <button className="nav-item btn-login" id="userLoginBtn">
            <NavLink to="/login">Login</NavLink>
          </button>
      </nav>
    </>
  );
}
