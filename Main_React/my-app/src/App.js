import React from 'react';
import './App.css';
import Navbar from "./Navbar/Navbar";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LogInForm from "./LogInForm/LogInForm.js";
import HomePage from "./HomePage/HomePage.js";
import RegistrationForm from "./registrationForm/registrationForm.js";
import ReserveCar from "./ReserveCar/ReserveCar";
import BrowseVehicle from "./BrowseVehicle/BrowseVehicle";
import MyProfile from "./MyProfile/MyProfile";
import Admin from "./Admin/Admin.js";
import Vehicles from "./Admin/Vehicles.js";
import Users from "./Admin/Users.js";


function App() {

    const [isLoggedIn, setIsLoggedIn] = React.useState(localStorage.getItem('userId') !== null);

    React.useEffect(() => {

    }, [isLoggedIn]);

    const handleLogin = (userId) => {
        localStorage.setItem("userId", userId);
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('userId');
        setIsLoggedIn(false);
    };

    return (
        <Router>
            <div className="App">
                <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>
                <Routes>
                    <Route path="/" exact element={<HomePage />} />
                    <Route path="/login" element={<LogInForm handleLogin={handleLogin}/>} />
                    <Route path="/register" element={<RegistrationForm/>} />
                    <Route path="/reserveCar" element={<ReserveCar/>} />
                    <Route path="/browseVehicle" element={<BrowseVehicle/>} />
                    <Route path="/myProfile" element={<MyProfile/>} />
                    <Route path="/admin" element={<Admin/>} />
                    <Route path="/vehicles" element={<Vehicles/>} />
                    <Route path="/users" element={<Users/>} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;