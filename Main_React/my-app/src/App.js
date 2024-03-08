import React from 'react';
import './App.css';
import Navbar from "./Navbar/Navbar";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LogInForm from "./LogInForm/LogInForm.js";
import HomePage from "./HomePage/HomePage.js";
import RegistrationForm from "./registrationForm/registrationForm.js";
import ReserveCar from "./ReserveCar/ReserveCar";


function App() {
    return (
        <Router>
            <div className="App">
                <Navbar/>
                <Routes>
                    <Route path="/home" exact element={<HomePage />} />
                    <Route path="/login" element={<LogInForm/>} />
                    <Route path="/register" element={<RegistrationForm/>} />
                    <Route path="/reserveCar" element={<ReserveCar/>} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;