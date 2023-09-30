import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./hamburger.css";

export default function HamburgerMenu() {
  const [showSubMenu, setShowSubMenu] = useState(false);

  const toggleSubMenu = () => {
    setShowSubMenu(!showSubMenu);
  };

  return (
    <div className="hamburger-menu">
      <input type="checkbox" />
      <div className="hamburger-lines">
        <span className="line line1"></span>
        <span className="line line2"></span>
        <span className="line line3"></span>
      </div>
      <ul className="menu-items">
        <li>
          <Link to="/computer_science">Computer Science</Link>
          <button
            className={`submenu-button ${showSubMenu ? "active" : ""}`}
            onClick={toggleSubMenu}
          >
            {/* &#9776; */}
          </button>
          <div className={`submenu ${showSubMenu ? "active" : ""}`}>
            <ul>
              <li>
                <Link to="/database">Data Base</Link>
              </li>
              <li>
                <Link to="/">Data Ware House </Link>
              </li>
              <li>
                <Link to="/">C++</Link>
              </li>
            </ul>
          </div>
        </li>
        <li>
          <Link to="/physics">Physics</Link>
        </li>
        <li>
          <Link to="/chemistry">Chemistry</Link>
        </li>
        <li>
          <Link to="/botony">Botony</Link>
        </li>
        <li>
          <Link to="/zoology">Zoology</Link>
        </li>
        <li>
          <Link to="/english">English</Link>
        </li>
      </ul>
    </div>
  );
}
