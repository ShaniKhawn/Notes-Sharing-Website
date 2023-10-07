import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";

export default function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if (!formData.email || !formData.password) {
            alert("Please fill in both email and password fields.");
            return;
        }
    
        try {
            const response = await fetch("http://localhost:5000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });
    
            const data = await response.json();
            console.log("Response:", data);
            
            // For User Id
            console.log('user-id', data.user);
            localStorage.setItem('user', data.user);
            
            // For Name
            console.log("User's name received from the server:", data.name);
            localStorage.setItem("userName", data.name);
            console.log("User's name stored in local storage:", localStorage.getItem("userName"));
            
            if (data.success) {
                if (data.isAdmin) {
                    navigate("/admin");
                } else {
                    navigate("/user");
                }
            }
    
            alert(data.message);
        } catch (error) {
            console.error(error);
        }
    };
    
    

    return (
        <>
            <form id="loginForm" onSubmit={handleSubmit}>
                <div className="logincontainer">
                    <div className="form_wrap">
                        <h2>Login Form</h2>
                        <div className="form_field">
                            <div className="input_group">
                                <input
                                    type="email"
                                    name="email"
                                    className="input"
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="input_group">
                                <input
                                    type="password"
                                    name="password"
                                    className="input"
                                    placeholder="Enter Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>

                            <input type="submit" className="btn" value="Login" />

                            <div>
                                <label htmlFor="not_member">Not a member? </label>
                                <Link to="/signup" className="not_member">SignUp</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
}
