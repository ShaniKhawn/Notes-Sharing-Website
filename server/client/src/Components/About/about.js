import React from "react";
// import { Link } from "react-router-dom";
import Navbar from "../Navbar/navbar";
import "./about.css";
import "../MainPage/main.css"
export default function About() {
    return (
        <>
            <Navbar />
          
            <div className="about">
                <div className="abtcontainer">
                    <div className="about-image">
                        <img src={require('../images/about.jpg')} alt="about" className="about-photo" />
                    </div>
                    <div className="about-content">
                        <h2 className="content-heading">About Us</h2>
                        <p className="about-text">Online Notes Sharing is a groundbreaking web-based platform designed to facilitate the seamless exchange of educational notes among students, teachers, and knowledge enthusiasts. 
                        With an intuitive user interface and a vast repository of notes covering various subjects, this platform redefines how individuals access and share educational resources.</p>
                    </div>
                </div>
            </div>
        </>
    )
}