import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./hamburger.css";

export default function HamburgerMenu() {
  const [showMenu, setShowMenu] = useState(false);
  const [showSubMenu, setShowSubMenu] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const toggleSubMenu = () => {
    setShowSubMenu(!showSubMenu);
  };

  useEffect(() => {
    const handleClick = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target)
      ) {
        setShowMenu(false);
        setShowSubMenu(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div className="hamburger-menu" ref={menuRef}>
      <input type="checkbox"/>
      <div className={`hamburger-lines ${showMenu ? "active" : ""}`} onClick={toggleMenu}>
        <span className="line line1"></span>
        <span className="line line2"></span>
        <span className="line line3"></span>
      </div>
      <ul className={`menu-items ${showMenu ? "active" : ""}`}>
        <li>
          <Link to="/user/viewallnotes/computer_science">Computer Science</Link>
          <button
            className={`submenu-button ${showSubMenu ? "active" : ""}`}
            onClick={toggleSubMenu}
          ></button>
          <div className={`submenu ${showSubMenu ? "active" : ""}`}>
            <ul>
              <li>
                <Link to="/user/viewallnotes/computer_science/database">Data Base</Link>
              </li>
              <li>
                <Link to="/">Web Engineering</Link>
              </li>
              <li>
                <Link to="/">C++</Link>
              </li>
            </ul>
          </div>
        </li>
        <li>
          <Link to="/user/viewallnotes/physics">Physics</Link>
        </li>
        <li>
          <Link to="/user/viewallnotes/chemistry">Chemistry</Link>
        </li>
        <li>
          <Link to="/user/viewallnotes/botany">Botany</Link>
        </li>
        <li>
          <Link to="/user/viewallnotes/zoology">Zoology</Link>
        </li>
        <li>
          <Link to="/user/viewallnotes/english">English</Link>
        </li>
      </ul>
    </div>
  );
}
