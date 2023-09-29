import React from "react";
import { Link } from "react-router-dom";
import "./hamburger.css";
import "./navbar.css"

export default function HamburgerMenu() {
  return (
    <div className="hamburger-menu">
        <input type="checkbox" />
        <div className="hamburger-lines">
          <span className="line line1"></span>
          <span className="line line2"></span>
          <span className="line line3"></span>
        </div>
        <ul className="menu-items">
          <li><Link to="/computer_science">Computer Science</Link>
            <div>
              <ul>
              <li>
                  <Link to="/HCI">HCI Notes</Link>
                </li>
                <li>
                  <Link to="/DWH">DWH Notes</Link>
                </li>
                <li>
                  <Link to="/C++">C++ Notes</Link>
                </li>
              </ul>
            </div>
          </li>
          <li><Link to="/physics">Physics</Link></li>
          <li><Link to="/chemistry">Chemistry</Link></li>
          <li><Link to="/botony">Botony</Link></li>
          <li><Link to="/zoology">Zoology</Link></li>
          <li><Link to="/english">English</Link></li>
        </ul>
      </div>
  );
}
