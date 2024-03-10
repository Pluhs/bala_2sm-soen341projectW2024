import React from 'react';
import { useState } from 'react';
import "./registrationForm.css";
import {Link, useNavigate} from 'react-router-dom';


const RegisterForm = () => {
    const [role, setRole] = useState('USER');
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, password, role}),
            });

            const data = await response.json();
            navigate('/login');

        } catch (err) {
            setError("This username is already taken !");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="RegisterFormMain">
            <form className="wrapperRegister" onSubmit={handleSignUp}>
                <h1>Register Form</h1>
                <div className="inputBoxRegister">
                    <input type="text" placeholder="Name" id="name" value={name} onChange={(e) => setName(e.target.value)} required/>
                    <i className="fa-solid fa-user"></i>
                </div>
                <div className="inputBoxRegister">
                    <input type="email" placeholder="Email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                    <i className="fa-solid fa-at"></i>
                </div>
                <div className="inputBoxRegister">
                    <input type="password" placeholder="Password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                    <i className="fa-solid fa-lock"></i>
                </div>
                <div className="inputBoxRegister">
                    <input type="password" placeholder="Confirm Password" id ="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required/>
                    <i className="fa-solid fa-lock"></i>
                </div>
                <button type="submit">Register</button>
                {error && <p className="RegisterError">{error}</p>}
            </form>
        </div>
    );
};

export default RegisterForm;
