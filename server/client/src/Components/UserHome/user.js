import React from "react";
import UserNavbar from "../Navbar/usernavbar";
import "../MainPage/main.css"


export default function User(){
    return(
        <>
            <UserNavbar />
            
            <div className="header-content">
                <h1 className="main-heading">Online Notes Sharing</h1>
            </div>
            {/* <nav className="nav-bar bg-color" id="navbar1">
                <div className="logo">Notes<span>Share</span></div>
                <ul className="nav-items">
                    <li className="nav-item"><Link to="/user">Home</Link></li>
                    <li className="nav-item"><Link to="/upload">Upload Notes</Link></li>
                    <li className="nav-item"><Link to="/viewallnotes">View All Notes</Link></li>
                    <li className="nav-item"><Link to="/mynotes">My Notes</Link></li>
                    <li><button id="logoutBtn">Logout</button></li>
                    <li className="right" id="welcomeUser"></li>
                </ul>
            </nav> */}
        </>
    )
}