import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import "./Admin.css"
import {fetchUserById} from "../LogInForm/UserInfo";

function Admin() {
    const [userRole, setUserRole] = useState('');
    const [isLoading, setIsLoading] = useState(true); // Added loading state

    useEffect(() => {
        const checkUserRole = async () => {
            setIsLoading(true); // Start loading
            const userId = localStorage.getItem('userId');
            if (userId) {
                const user = await fetchUserById(userId);
                setUserRole(user.role);
            }
            setIsLoading(false);
        };

        checkUserRole();
    }, []);

    if (isLoading) {
        return <div className="loadingContainer">
            <div className="centered-container">Loading...</div>
        </div>;
    }

    // Unauthorized access message
    if (userRole !== 'ADMIN') {
        return <div className="sorryContainer">
            <img src="/Images/unauthorized.png" className="sorryImg" alt="unauthorized"/>
            <h3 className="sorryMsg">We are Sorry...</h3>
            <p className="sorryText">Access denied due to invalid credentials</p>
            <Link to={`/`}>
                <button className="sorryBtn">Go Back To Home Page</button>
            </Link>
        </div>;
    }

    // Admin main content
    return (
        <div className="adminMainContainer">
            <div className="adminLeftContainer">
                <a href="/Vehicles" className="adminLeftInnerContainer">
                    <img src="/Images/adminCarsSection.png" className="adminPageBackgroundImgLeft"
                         alt="View All Vehicles"/>
                    <div className="imageTextDivLeft">
                        <h2>View All Vehicles</h2>
                    </div>
                </a>
            </div>
            <div className="adminRightContainer">
                <a href="/Users" className="adminRightInnerContainer">
                    <img src="/Images/adminUsersSection.png" className="adminPageBackgroundImgRight"
                         alt="Show All Registered Users"/>
                    <div className="imageTextDivRight">
                        <h2>Show All Registered Users</h2>
                    </div>
                </a>
            </div>
        </div>
    );
}

export default Admin;
