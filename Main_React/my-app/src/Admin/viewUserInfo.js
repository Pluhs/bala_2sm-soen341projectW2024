import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {
    deleteReservationById,
    fetchCars,
    fetchReservationsForUserById,
    updateReservationById
} from './ReservationsInfo';
import {fetchUserById} from '../LogInForm/UserInfo'
import "./viewUserInfo.css";

function ViewUserInfo() {
    const location = useLocation();
    const userId = location.state?.id;
    const [selectedCar, setSelectedCar] = useState('');
    const [user, setUser] = useState(null);
    const [reservations, setReservations] = useState([]);
    const [editingReservation, setEditingReservation] = useState(null);
    const [showCreateReservationForm, setShowCreateReservationForm] = useState(false);
    const [cars, setCars] = useState([]);
    const [newReservation, setNewReservation] = useState({
        pickupDate: '',
        dropDate: '',
        car: '',
    });
    let navigate = useNavigate()


    useEffect(() => {
        const fetchAvailableCars = async () => {
            const fetchedCars = await fetchCars();
            setCars(fetchedCars);
        };

        fetchAvailableCars();
    }, []);

    const handleCarChange = (e) => {
        setSelectedCar(e.target.value);
    };

    const handleSubmitNewReservation = async (e) => {
        e.preventDefault();
        if (!newReservation.pickupDate || !newReservation.dropDate || !newReservation.car || !newReservation.userAddress || !newReservation.phoneNumber || !newReservation.driverLicense || !newReservation.cardNumber) {
            alert("Please fill in all fields.");
            return;
        }

        const confirmed = window.confirm(`Please verify the booking information.
        \nCar: ${newReservation.car}
        \nCar Insurance Selected (for 70$/day): ${newReservation.insurance}
        \n pickup: ${newReservation.pickupDate}
         \n drop: ${newReservation.dropDate}
        \nCleaning Selected (for 35$/day): ${newReservation.cleaning}
        \n\nYour Info:
        \nAddress: ${newReservation.userAddress}
        \nPhone Number: ${newReservation.phoneNumber}
        \nDriver's License Number: ${newReservation.driverLicense}
        \nCard Number: ${newReservation.cardNumber}`);


        if (!confirmed) {
            return;
        }

        const cardNum = newReservation.cardNumber;

        try {
            const pickedUp = false;
            const returned = false;
            const response = await fetch(`http://localhost:8080/users/${userId}/reservations`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    pickupDate: new Date(newReservation.pickupDate).toISOString(),
                    dropDate: new Date(newReservation.dropDate).toISOString(),
                    car: {id: newReservation.car},
                    userAddress: newReservation.userAddress,
                    phoneNumber: newReservation.phoneNumber,
                    driverLicense: newReservation.driverLicense,
                    insurance: newReservation.insurance,
                    cleaning: newReservation.cleaning,
                    pickedUp,
                    returned,
                    cardNum: newReservation.cardNumber
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to reserve the car');
            }

            await fetchAndSetReservations();
            setShowCreateReservationForm(false);
            setNewReservation({
                pickupDate: '',
                dropDate: '',
                car: '',
                userAddress: '',
                phoneNumber: '',
                driverLicense: '',
                insurance: false,
                cleaning: false,
                cardNumber: ''
            });
            console.log('Car reserved successfully');
        } catch (err) {
            console.error("Error creating reservation:", err);
            alert("Failed to reserve the car");
        }
    };


    const handleSaveEdit = async (e, reservation) => {
        e.preventDefault();
        const updatedReservation = {
            ...reservation,
            pickupDate: new Date(editingReservation.pickupDate).toISOString(),
            dropDate: new Date(editingReservation.dropDate).toISOString(),
        };

        const isSuccess = await updateReservationById(userId, reservation.id, updatedReservation);
        if (isSuccess) {
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
        const isSuccess = await deleteReservationById(userId, reservationId);
        if (isSuccess) {
            setReservations(reservations.filter(reservation => reservation.id !== reservationId));
        } else {
            alert("Failed to cancel the reservation.");
        }
    };
    const handleGetReservationIdOnCheckIn = (id) => {

        navigate('/checkIn', {state: {id: id, userID: userId}})
    }

    const handleGetReservationIdOnCheckOut = (id) => {

        navigate('/checkOut', {state: {id: id, userID: userId}})
    }
    const fetchAndSetReservations = async () => {
        if (!userId) return;
        const fetchedReservations = await fetchReservationsForUserById(userId);
        setReservations(fetchedReservations);
    };
    useEffect(() => {
        fetchAndSetReservations();
    }, [userId]);


    if (!user || !reservations) return <div className="centered-container">Loading...</div>;

    return (
        <div className="ReservationAdmin">
            <h1>Reservations for {user.name || user.email}: <i className="fa fa-plus"
                                                               onClick={() => setShowCreateReservationForm(!showCreateReservationForm)}></i>
            </h1>{showCreateReservationForm && (
            <form onSubmit={handleSubmitNewReservation} className="editReservationForm">
                <p className="carSelectText">Car:</p>
                <select
                    className="carSelect"
                    value={newReservation.car}
                    onChange={(e) => setNewReservation({...newReservation, car: e.target.value})}
                >
                    <option value={selectedCar} onChange={handleCarChange}>-- Select --</option>
                    {cars.map(car => (
                        <option key={car.id} value={car.id}> {car.color} {car.name} {car.model} {car.year} </option>
                    ))}
                </select>
                <div className="formInputContainer">
                    <label>Pickup Date:</label>
                    <input
                        type="date"
                        value={newReservation.pickupDate}
                        onChange={(e) => setNewReservation({...newReservation, pickupDate: e.target.value})}
                    />
                </div>
                <div className="formInputContainer">
                    <label>Drop Date:</label>
                    <input
                        type="date"
                        value={newReservation.dropDate}
                        onChange={(e) => setNewReservation({...newReservation, dropDate: e.target.value})}
                    />
                </div>
                <div className="formInputContainer">
                    <label>Address:</label>
                    <input
                        type="text"
                        value={newReservation.userAddress}
                        onChange={(e) => setNewReservation({...newReservation, userAddress: e.target.value})}
                    />
                </div>
                <div className="formInputContainer">
                    <label>Phone Number:</label>
                    <input
                        type="text"
                        value={newReservation.phoneNumber}
                        onChange={(e) => setNewReservation({...newReservation, phoneNumber: e.target.value})}
                    />
                </div>
                <div className="formInputContainer">
                    <label>Driver's License:</label>
                    <input
                        type="text"
                        value={newReservation.driverLicense}
                        onChange={(e) => setNewReservation({...newReservation, driverLicense: e.target.value})}
                    />
                </div>
                <div className="formInputContainer">
                    <label>Card Number:</label>
                    <input
                        type="text"
                        value={newReservation.cardNumber}
                        onChange={(e) => setNewReservation({...newReservation, cardNumber: e.target.value})}
                    />
                </div>
                <div className="formInputContainer">
                    <input
                        type="checkbox"
                        checked={newReservation.insurance}
                        onChange={(e) => setNewReservation({...newReservation, insurance: e.target.checked})}
                    />
                    <label>Insurance (70$/day)</label>
                </div>
                <div className="formInputContainer">
                    <input
                        type="checkbox"
                        checked={newReservation.cleaning}
                        onChange={(e) => setNewReservation({...newReservation, cleaning: e.target.checked})}
                    />
                    <label>Cleaning (35$/day)</label>
                </div>
                <div className="formButtonsContainerReservation">
                    <button type="submit" className="editBtn">Create Reservation</button>
                    <button type="button" onClick={() => setShowCreateReservationForm(false)}
                            className="cancelBtn">Cancel
                    </button>
                </div>
            </form>
        )}


            {
                editingReservation && (
                    <form onSubmit={(e) => handleSaveEdit(e, editingReservation)} className="editReservationForm">
                        <div className="static-info-container">
                            <label>Pickup Date:</label>
                            <input
                                type="date"
                                value={editingReservation.pickupDate.split('T')[0]}
                                onChange={(e) => setEditingReservation({...editingReservation, pickupDate: e.target.value})}
                            />
                        </div>
                        <div className="static-info-container">
                            <label>Drop Date:</label>
                            <input
                                type="date"
                                value={editingReservation.dropDate.split('T')[0]}
                                onChange={(e) => setEditingReservation({...editingReservation, dropDate: e.target.value})}
                            />
                        </div>
                        <div className="formButtonsContainerReservation">
                            <button type="submit" className="editBtn">Save Changes</button>
                            <button type="button" onClick={() => setEditingReservation(null)} className="cancelBtn">Cancel
                            </button>
                        </div>
                    </form>
                )}


            {reservations.length > 0 ? (
                reservations.map(reservation => (
                    <div key={reservation.id} className="yourReservationContainerAdmin">
                        <div className="leftContentAdmin">
                            <b className="carInfoTxtAdmin">{reservation.car?.name} {reservation.car?.model} {reservation.car?.year}</b>
                            <b>Pickup Date: {reservation.pickupDate}</b>
                        </div>
                        <div className="rightContent">
                            <b className="priceAdmin">Price: ${reservation.car?.price}/day</b>
                            <b className="endDateTxt">Return Date: {reservation.dropDate}</b>
                        </div>
                        <div className="buttonsContainerReservation">
                            {reservation.pickedUp ? (
                                <button
                                    className="checkInOutBtn"
                                    onClick={() => handleGetReservationIdOnCheckOut(reservation?.id)}>
                                    Check Out
                                </button>
                            ) : (
                                <button
                                    className="checkInOutBtn"
                                    onClick={() => handleGetReservationIdOnCheckIn(reservation?.id)}>
                                    Check In
                                </button>
                            )}
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
