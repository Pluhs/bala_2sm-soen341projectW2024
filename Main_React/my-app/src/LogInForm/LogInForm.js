import React, {useState} from 'react';
import "./LogInForm.css"
import {Link, useNavigate} from 'react-router-dom';


const LogInForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSignIn = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const queryParams = new URLSearchParams({ email, password }).toString();
        const signInUrl = `http://localhost:8080/users/sign-in?${queryParams}`;

        try {
            const response = await fetch(signInUrl, { method: "POST" });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || "Username or password is incorrect");
            }
            const data = await response.json();
            const id = data.userId;
            localStorage.setItem("userId", id);
            navigate('/');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className= "LogInFormMain">
            <form action="" className="wrapperLogin" onSubmit={handleSignIn}>
                <h1>Login Form</h1>
                <div className="inputBoxLogin">
                    <input type="email" placeholder='Email' id = "email" value={email} onChange={(e) => setEmail(e.target.value)}  required/>
                    <i className="fa-solid fa-at"></i>
                </div>
                <div className="inputBoxLogin">
                    <input type="password" placeholder='Password' id="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                    <i className="fa-solid fa-lock"></i>
                </div>
                <button type="submit" disabled={loading}>{loading ? "Logging In..." : "Log In"}</button>
                <div className="registerLink">
                    <p>Don't have an account? <Link to="/register">Register</Link></p>
                </div>
                {error && <p className="LogInErrorMessage">The email or the password is incorrect.</p>}
            </form>
        </div>
    );
};

export default LogInForm;
