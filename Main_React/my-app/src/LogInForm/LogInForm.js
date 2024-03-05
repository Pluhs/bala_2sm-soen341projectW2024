import React from 'react';
import "./LogInForm.css"
import { Link } from 'react-router-dom';



const LogInForm = () => {
    return (
        <div className= "LogInFormMain">
            <form action="" className="wrapper">
                <h1>Login Form</h1>
                <div className="inputBox">
                    <input type="text" placeholder='Username' required/>
                    <i className="fa-solid fa-user"></i>
                </div>
                <div className="inputBox">
                    <input type="password" placeholder='Password' required/>
                    <i className="fa-solid fa-lock"></i>
                </div>
                <button type="submit">Login</button>

                <div className="registerLink">
                    <p>Don't have an account? <Link to="/register">Register</Link></p>
                </div>
            </form>
        </div>
    );
};

export default LogInForm;
