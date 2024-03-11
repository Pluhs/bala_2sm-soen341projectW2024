import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchReservationsForUserById } from './ReservationsInfo';
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
        <div className="ReservationAdmin">
            <h1>Reservations for {user.name || user.email}</h1>
            {reservations.length > 0 ? (
                reservations.map(reservation => (
                    <div key={reservation.id} className="yourReservationContainerAdmin">
                        <div className="leftContentAdmin">
                            <b className="carInfoTxtAdmin">{reservation.car?.name}</b>
                            <b className="startDateTxtAdmin">Pickup Date: {reservation.pickupDate}</b>
                        </div>
                        <div className="rightContent">
                            <b className="priceAdmin">Price: ${reservation.car?.price}/day</b>
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
