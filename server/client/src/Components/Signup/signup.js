import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./signup.css"

export default function Signup() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
            alert("Please fill in all required fields.");
            return;
        }
    
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match.");
            return;
        }
    
        try {
            const response = await fetch("http://localhost:5000/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ...formData,
                    isAdmin: false //initial value for isAdmin is false
                })
            });
    
            const data = await response.json();
            console.log("Response:", data);
    
            if (data.message === 'User created successfully') {
            navigate("/login");
            alert("User created successfully");
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error(error);
        }
    };
    
    
    return (
        <>
            <form id="signupForm" onSubmit={handleSubmit}>
                <div className="signupcontainer">
                    <div className="form_wrap">
                        <h2>SignUp Form</h2>
                        <div className="form_field login_form">
                            <div className="input_group">
                            <input
                                type="text"
                                className="input"
                                name="name"
                                placeholder="Enter Name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                            </div>
                            <div className="input_group">
                            <input
                                type="email"
                                className="input"
                                name="email"
                                placeholder="Enter Email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            </div>

                            <div className="input_group">
                            <input
                                type="password"
                                className="input"
                                name="password"
                                placeholder="Your Password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            </div>

                            <div className="input_group">
                            <input
                                type="password"
                                className="input"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                            </div>

                            <input type="submit" className="btn" value="Register" />

                            <div>
                                <label htmlFor="member">Already have an account </label>
                                <Link to="/login" className="member">Login</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}