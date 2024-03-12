import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchReservationsForUserById, deleteReservationById, updateReservationById} from './ReservationsInfo'; // Assume deleteReservationById is exported
import {fetchUserById} from '../LogInForm/UserInfo'
import "./viewUserInfo.css";


function ViewUserInfo() {
    const location = useLocation();
    const userId = location.state?.id;

    const [user, setUser] = useState(null);
    const [reservations, setReservations] = useState([]);
    const [editingReservation, setEditingReservation] = useState(null);

    const handleSaveEdit = async (e, reservation) => {
        e.preventDefault();
        const updatedReservation = {
            ...reservation,
            pickupDate: new Date(editingReservation.pickupDate).toISOString(),
            dropDate: new Date(editingReservation.dropDate).toISOString(),
        };

        const isSuccess = await updateReservationById(userId, reservation.id, updatedReservation);
        if (isSuccess) {
            // This assumes the isSuccess variable actually reflects the successfully updated reservation data from the backend
            const updatedReservations = reservations.map(res =>
                res.id === reservation.id ? {...res, ...isSuccess} : res
            );
            setReservations(updatedReservations);
            setEditingReservation(null);
        } else {
            alert("Failed to update the reservation.");
        }
    };




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

    const cancelReservation = async (reservationId) => {
        const isSuccess = await deleteReservationById(userId, reservationId); // This function needs to be implemented
        if (isSuccess) {
            setReservations(reservations.filter(reservation => reservation.id !== reservationId));
        } else {
            alert("Failed to cancel the reservation.");
        }
    };

    if (!user || !reservations) return <div className="centered-container">Loading...</div>;

    return (
        <div className="ReservationAdmin">
            <h1>Reservations for {user.name || user.email}</h1>
            {editingReservation && (
                <form onSubmit={(e) => handleSaveEdit(e, editingReservation)}>
                    <label>Pickup Date:</label>
                    <input
                        type="date"
                        value={editingReservation.pickupDate.split('T')[0]} // Assuming the date comes in ISO format
                        onChange={(e) => setEditingReservation({...editingReservation, pickupDate: e.target.value})}
                    />
                    <label>Drop Date:</label>
                    <input
                        type="date"
                        value={editingReservation.dropDate.split('T')[0]} // Assuming the date comes in ISO format
                        onChange={(e) => setEditingReservation({...editingReservation, dropDate: e.target.value})}
                    />
                    <button type="submit">Save Changes</button>
                    <button type="button" onClick={() => setEditingReservation(null)}>Cancel</button>
                </form>
            )}

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
                        <div className="buttonsContainerReservation">
                            <button type="button" className="editBtn"
                                    onClick={() => setEditingReservation(reservation)}>Edit
                            </button>
                            <button type="button" className="deleteReservation"
                                    onClick={() => cancelReservation(reservation.id)}>Cancel Reservation
                            </button>
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
