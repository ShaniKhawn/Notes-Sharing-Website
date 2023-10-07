import React from "react";
import UserNavbar from "../../Navbar/usernavbar";
import "../../HomePage/main.css";

export default function User() {
  const userName = localStorage.getItem("userName");

  return (
    <>
      <UserNavbar />

      <div className="header-content">
        <h1 className="main-heading">
          Welcome, {userName}!
        </h1>
      </div>
    </>
  );
}
