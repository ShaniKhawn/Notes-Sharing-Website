import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/navbar";
import "./main.css";
import {  TbLogin } from "react-icons/tb";
import { FaUpload, FaDownload, FaUser, FaFacebook, FaTwitter, FaInstagram, FaDribbble} from "react-icons/fa";


export default function Main() {
    return (
        <>
            <header className="header">
                <Navbar />           
            </header>

            <div className="header-content">
                <h1 className="main-heading">Online Notes Sharing</h1>
            </div>

            <section className="features">
                <div className="container-box">
                    <div className="buttons">
                        <div className="ribbon-box">
                            <Link to="/signup" className="block" id="createAccountBtn">
                                <FaUser size="2rem"/>
                                <h3 className="font">Create Account</h3>
                            </Link>
                        </div>

                        <div className="ribbon-box">
                            <Link to="/login" className="block" id="loginBtn">
                                <TbLogin size="2rem"/>
                                <h3 className="font">Login</h3>
                            </Link>
                        </div>

                        <div className="ribbon-box">
                            <Link to="/login" className="block" id="uploadNotesBtn">
                                <FaUpload size="2rem"/>
                                <h3 className="font">Upload Notes</h3>
                            </Link>
                        </div>

                        <div className="ribbon-box">
                            <Link to="/login" className="block" id="downloadNotesBtn">
                                <FaDownload size="2rem"/>
                                <h3 className="font">Download Notes</h3>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="footer">
                <FaFacebook size="4rem" className="soical-icons"/>
                <FaInstagram size="4rem" className="soical-icons"/>
                <FaTwitter size="4rem" className="soical-icons"/>
                <FaDribbble size="4rem" className="soical-icons"/>
                <p>Copy Write &copy; 2023, All Right Reserved</p>
            </footer>
        </>
    )
}