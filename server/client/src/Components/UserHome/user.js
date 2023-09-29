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
        </>
    )
}