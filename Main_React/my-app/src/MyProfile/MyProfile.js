import React, {useEffect, useState} from 'react';
import "./MyProfile.css"
import {fetchUserById} from "../LogInForm/UserInfo";
import { deleteReservationById,fetchReservationsForUserById } from '../Admin/ReservationsInfo';
import {Link} from "react-router-dom";


const MyProfile = () => {
    const [userReservations, setUserReservations] = useState([]);

    const userId = localStorage.getItem("userId");

    useEffect(() => {
        if (userId) {
            fetchUserById(userId).then(result => {
                if (result && result.reservations) {
                    setUserReservations(result.reservations);
                } else {
                    setUserReservations([]);
                }
            }).catch(error => {
                console.error('Error fetching user data:', error);
                setUserReservations([]);
            });
        }
    }, [userId]);


    const cancelReservation = async (reservationId) => {
        const isSuccess = await deleteReservationById(userId, reservationId);
        if (isSuccess) {
            try {
                const updatedReservations = await fetchReservationsForUserById(userId);
                setUserReservations(updatedReservations);
            } catch (error) {
                console.error('Failed to fetch updated reservations:', error);
                alert('Failed to update reservation list.');
            }
        } else {
            alert("Failed to cancel the reservation.");
        }
    };
    if (!userId) {
        return (
            <div className="sorryContainer">
                <img src="/Images/unauthorized.png" className="sorryImg" alt="unauthorized" />
                <h3 className="sorryMsg">We are Sorry...</h3>
                <p className="sorryText">Access is denied due to the absence of a valid login session.</p>
                <Link to={`/login`}>
                    <button className="sorryBtn">Go Back To Login Page</button>
                </Link>
            </div>
        );
    }


    return (
        <div className="myProfile">
            <h1>Your Reservations:</h1>
            {userReservations.length > 0 ? (
                <div>
                    {userReservations.map(reservation => (
                        <div key={reservation.id} className="yourReservationContainer">
                            <img src={reservation.car.imageUrl} alt="Car" className="yourReservationCarImg"/>
                            <div className="leftContent">
                                <b className="carInfoTxt">{reservation.car.name} {reservation.car.model} {reservation.car.year}</b>
                                <b className="startDateTxt">Pickup Date: {reservation.pickupDate}</b>
                            </div>
                            <div className="rightContent">
                                <b className="price">Price: {reservation.car.price}$/day</b>
                                <b className="endDateTxt">Return Date: {reservation.dropDate}</b>
                            </div>
                            <div className="deleteReservationBtnContainer">
                                <button
                                    type="button"
                                    className="deleteReservationBtn"
                                    onClick={() => cancelReservation(reservation.id)}>
                                    Cancel Reservation
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>You don't have any upcoming reservations.</p>
            )}
        </div>
    );
}

export default MyProfile;
