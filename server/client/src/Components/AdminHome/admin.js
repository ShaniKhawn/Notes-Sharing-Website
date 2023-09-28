import React from "react";
import { Link } from "react-router-dom";
import AdminNavbar from "../Navbar/adminnavbar";
import "./admin.css";
import { GiNotebook } from "react-icons/gi";
import {ImCancelCircle} from "react-icons/im";
import {FiBookOpen} from "react-icons/fi";
import {TbFileCheck} from "react-icons/tb";



export default function Admin() {
    return (
        <>
            <AdminNavbar />

            <main className="container">
                <div className="content">
                    <div className="row">
                        <div className="ribbon-box">
                            <Link to="/pendingnotes" className="block">
                                <div></div>
                                <GiNotebook size="2rem"/>
                                <p className="font">Pending Notes</p>
                            </Link>
                        </div>

                        <div className="ribbon-box">
                            <Link to="/rejectnotes" className="block">
                                <ImCancelCircle size="2rem"/>
                                <p className="font">Rejected Notes</p>
                            </Link>
                        </div>

                        <div className="ribbon-box">
                            <Link to="/acceptnotes" className="block">
                                <FiBookOpen size="2rem"/>
                                <p className="font">Accepted Notes</p>
                            </Link>
                        </div>

                        <div className="ribbon-box">
                            <Link to="/allnotes" className="block">
                                <TbFileCheck size="2rem"/>
                                <p className="font">All Notes</p>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}