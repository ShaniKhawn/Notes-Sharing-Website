import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css"
import { useNavigate } from "react-router-dom";
import { FaCaretDown } from "react-icons/fa";

export default function AdminNavbar() {
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName");

  return (
    <>
      <nav className="nav-bar bg-color">
        <div className="logo">
          Notes<span>Share</span>
        </div>
        <ul className="nav-items">
          <li className="nav-item">
            <Link to="/admin">Home</Link>
          </li>
          <li className="nav-item">
            <div style={{ cursor: "pointer", color: "white" }}>
              View Notes <FaCaretDown />
            </div>
            <div className="dropdown">
              <ul className="dropdown-content">
                <li>
                  <Link to="/admin/pendingnotes">Pending Notes</Link>
                </li>
                <li>
                  <Link to="/admin/rejectnotes">Rejected Notes</Link>
                </li>
                <li>
                  <Link to="/admin/acceptnotes">Accepted Notes</Link>
                </li>
                <li>
                  <Link to="/admin/allnotes">All Notes</Link>
                </li>
              </ul>
            </div>
          </li>
          <li className="nav-item">
            <Link to="/admin/viewusers">View User</Link>
          </li>
          <li className="nav-item">
            <Link to="/admin/contactqueries">Contact Query</Link>
          </li>
          <li>
          <li className="nav-item" id="welcomeUser">Welcome, {userName}</li>
          </li>
        </ul>
          <button id="logoutBtn" onClick={() => navigate("/")}>
            Logout
          </button>
      </nav>
    </>
  );
}
