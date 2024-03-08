import React from 'react';
import "./LogInForm.css"
import { Link } from 'react-router-dom';



const LogInForm = () => {
    return (
        <div className= "LogInFormMain">
            <form action="" className="wrapperLogin">
                <h1>Login Form</h1>
                <div className="inputBoxLogin">
                    <input type="text" placeholder='Username' required/>
                    <i className="fa-solid fa-user"></i>
                </div>
                <div className="inputBoxLogin">
                    <input type="password" placeholder='Password' required/>
                    <i className="fa-solid fa-lock"></i>
                </div>
                <button type="submit">Login</button>

                <div className="registerLink">
                    <p>Don't have an ac

                        count? <Link to="/register">Register</Link></p>
                </div>
            </form>
        </div>
    );
};

export default LogInForm;
