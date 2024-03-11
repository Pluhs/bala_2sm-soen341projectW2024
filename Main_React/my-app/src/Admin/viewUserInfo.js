import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import{fetchReservationsForUserById} from "./ReservationsInfo";
import { fetchUserById } from "../LogInForm/UserInfo";
import "./viewUserInfo.css";

function ViewUserInfo() {
    const location = useLocation();
    const userId = location.state?.id;

    const [user, setUser] = useState(null);
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        const fetchUserAndReservations = async () => {
            if (!userId) return;
            const fetchedUser = await fetchUserById(userId);
            setUser(fetchedUser);

            const fetchedReservations = await fetchReservationsForUserById(userId);
            setReservations(fetchedReservations);
        };

        fetchUserAndReservations();
    }, [userId]);

    if (!user || !reservations) return <div className="centered-container">Loading...</div>;

    return (
        <div className="myProfile">
            <h1>Reservations for {user.name || user.email}</h1>
            {reservations.length > 0 ? (
                reservations.map(reservation => (
                    <div key={reservation.id} className="yourReservationContainer">
                        <div className="leftContent">
                            <b className="carInfoTxt">{reservation.car?.name}</b>
                            <b className="startDateTxt">Pickup Date: {reservation.pickupDate}</b>
                        </div>
                        <div className="rightContent">
                            <b className="price">Price: ${reservation.car?.price}/day</b>
                            <b className="endDateTxt">Return Date: {reservation.dropDate}</b>
                        </div>
                        <div className="deleteReservationBtnContainer">
                            <button type="button" className="deleteReservationBtn">Cancel Reservation</button>
                        </div>
                    </div>
                ))
            ) : (
                <p>No reservations found for this user.</p>
            )}
        </div>
    );
}

export default ViewUserInfo;
