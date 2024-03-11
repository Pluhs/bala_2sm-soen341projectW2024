import React from 'react';
import "./Users.css"


function Users() {
    return (
        <div className="usersContainer">
            <h1>ALL REGISTERED USERS:</h1>



            {}
            {/*{reservations.length > 0 ? (*/}
            {/*    <div>*/}
            {/*        {reservations.map(reservation => (*/}
            {/*            <div key={reservation.id} className="yourReservationContainer">*/}
            {/*                <img src={reservation.car.imageUrl} className="yourReservationCarImg"/>*/}
            {/*                <div className="leftContentUsers">*/}
            {/*                    <b className="carInfoTxt">{reservation.car.name} </b>*/}
            {/*                    <b className="startDateTxt">Pickup Date: {reservation.pickupDate} </b>*/}
            {/*                </div>*/}
            {/*                <div className="rightContentUsers">*/}
            {/*                    <b className="price">Price: {reservation.car.price}$/day </b>*/}
            {/*                    <b className="endDateTxt">Return Date: {reservation.dropDate} </b>*/}
            {/*                </div>*/}
            {/*                <div className="deleteReservationBtnContainer">*/}
            {/*                    <button type="button" className="deleteReservationBtn" formAction="#">Delete Reservation*/}
            {/*                    </button>*/}
            {/*                </div>*/}
            {/*            </div>*/}


            {/*        ))}*/}
            {/*    </div>*/}
            {/*) : (*/}
            {/*    <p>You don't have any upcoming reservations.</p>*/}
            {/*)}*/}

            <div>
                <div key="#" className="usersInfoContainers">
                    {/*<img src={reservation.car.imageUrl} className="yourReservationCarImg"/>*/}
                    <div className="leftContentUsers">
                        <b className="carInfoTxt">"NAME HERE" </b>
                    </div>
                    <div className="rightContentUsers">
                        <b className="startDateTxt">Email: </b>
                    </div>
                    <div className="buttonsContainerUsers">
                        <button type="button" className="viewUserBtn" formAction="#">View User
                        </button>
                        <button type="button" className="deleteUserBtn" formAction="#">Delete User
                        </button>
                    </div>
                </div>


            </div>
            <div>
                <div key="#" className="usersInfoContainers">
                    {/*<img src={reservation.car.imageUrl} className="yourReservationCarImg"/>*/}
                    <div className="leftContentUsers">
                        <b className="carInfoTxt">"NAME HERE" </b>
                    </div>
                    <div className="rightContentUsers">
                        <b className="startDateTxt">Email: </b>
                    </div>
                    <div className="buttonsContainerUsers">
                        <button type="button" className="viewUserBtn" formAction="#">View User
                        </button>
                        <button type="button" className="deleteUserBtn" formAction="#">Delete User
                        </button>
                    </div>
                </div>


            </div>


        </div>
    );
}

export default Users;