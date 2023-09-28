import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css"
import { useNavigate } from "react-router-dom";
import { FaCaretDown } from "react-icons/fa";

export default function AdminNavbar() {
  const navigate = useNavigate();
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
            <div style={{ cursor: "pointer" }}>
              View Notes <FaCaretDown />
            </div>
            <div className="dropdown">
              <ul className="dropdown-content">
                <li>
                  <Link to="/pendingnotes">Pending Notes</Link>
                </li>
                <li>
                  <Link to="/rejectnotes">Rejected Notes</Link>
                </li>
                <li>
                  <Link to="/acceptnotes">Accepted Notes</Link>
                </li>
                <li>
                  <Link to="/allnotes">All Notes</Link>
                </li>
              </ul>
            </div>
          </li>
          <li className="nav-item">
            <Link to="/viewusers">View User</Link>
          </li>
          <li className="nav-item">
            <Link to="/contactqueries">Contact Query</Link>
          </li>
          <li>
            <button id="logoutBtn" onClick={() => navigate("/")}>
              Logout
            </button>
          </li>
          <li className="right" id="welcomeUser"></li>
        </ul>
      </nav>
    </>
  );
}
