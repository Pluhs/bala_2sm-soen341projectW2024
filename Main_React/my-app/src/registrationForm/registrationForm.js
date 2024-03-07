import React from 'react';
import { useState } from 'react';
import "./registrationForm.css";


const RegisterForm = () => {
    const [role, setRole] = useState('user'); // Default role is 'user'

    return (
        <div className="RegisterFormMain">
            <form className="wrapper">
                <h1>Register Form</h1>
                <div className="inputBox">
                    <input type="text" placeholder="Name" required/>
                    <i className="fa-solid fa-user"></i>
                </div>
                <div className="inputBox">
                    <input type="email" placeholder="Email" required/>
                    <i className="fa-solid fa-at"></i>
                </div>
                <div className="inputBox">
                    <input type="password" placeholder="Password" required/>
                    <i className="fa-solid fa-lock"></i>
                </div>
                <div className="inputBox">
                    <input type="password" placeholder="Confirm Password" required/>
                    <i className="fa-solid fa-lock"></i>
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default RegisterForm;
