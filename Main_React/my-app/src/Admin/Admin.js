import React from 'react';
import {Link} from "react-router-dom";
import "./Admin.css"


function Admin() {


    return (
        <div className="adminMainContainer">

            <div className="adminLeftContainer">

                <a href="/browseVehicle" className="adminLeftInnerContainer">
                    <img src="/Images/adminCarsSection.png" className="adminPageBackgroundImgLeft"/>
                    <div className="imageTextDivLeft">
                        <h2>View All Vehicles</h2>
                    </div>

                </a>

                {/*<div className="imageTextDivLeft">*/}
                {/*    <h2>Your text content here</h2>*/}
                {/*</div>*/}


            </div>


            <div className="adminRightContainer">
                <a href="/" className="adminRightInnerContainer">
                    <img src="/Images/adminUsersSection.png" className="adminPageBackgroundImgRight"/>
                    <div className="imageTextDivRight">
                        <h2>Show All Registered Users</h2>
                    </div>

                </a>

                {/*<div className="imageTextDivRight">*/}
                {/*    <h2>KJshgHGLHSGLHSGDOHSGh</h2>*/}
                {/*</div>*/}



            </div>

        </div>
    );
}

export default Admin;