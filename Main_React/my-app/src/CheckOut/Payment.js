import React, { useEffect, useState } from 'react';
import "./Payment.css"
import {useLocation, useNavigate} from "react-router-dom";
import { fetchUserById, fetchUserReservationById } from "../LogInForm/UserInfo";

const Payment = () => {
    const location = useLocation();
    const [rentalDetails, setRentalDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchReservationData = async () => {
            try {
                const userId = location?.state?.userId;
                const reservationId = location?.state?.reservationId;

                const userInfo = await fetchUserById(userId);
                const reservationInfo = await fetchUserReservationById(userId, reservationId);

                if (reservationInfo && userInfo) {
                    const rentalStartDate = new Date(reservationInfo.pickupDate);
                    const rentalEndDate = new Date(reservationInfo.dropDate);
                    const differenceInMilliseconds = rentalEndDate - rentalStartDate;
                    const rentedDays = differenceInMilliseconds / (1000 * 3600 * 24);
                    const pricePerDay = reservationInfo.car.price;

                    const rentalPrice = rentedDays * pricePerDay;
                    const cleaningFee = reservationInfo.cleaning ? 35 : 0;
                    const insuranceFee = reservationInfo.insurance ? 70 : 0;
                    const totalAmount = rentalPrice + cleaningFee + insuranceFee;

                    setRentalDetails({
                        userInfo,
                        reservationInfo,
                        rentedDays,
                        pricePerDay,
                        rentalPrice,
                        cleaningFee,
                        insuranceFee,
                        totalAmount
                    });
                }
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching reservation data', error);
                alert('Error fetching reservation data');
            }
        };

        fetchReservationData();
    }, [location]);

    if (isLoading) {
        return <div className="centered-container">Loading...</div>;
    }

    if (!rentalDetails) {
        return <div>No rental details found.</div>;
    }

    const handlePay = async (event) => {
        event.preventDefault();

        navigate('/ConfirmPayment')

    }
    if (isLoading) {
        return <div className="centered-container">Loading...</div>;
    }


    return (
        <div className="paymentDiv">
            <h2>Rental Details</h2>
            <div className="rental-details">

                <div className="userInfoDiv">
                    <p><strong>User Information:</strong></p>
                    <p>Name: {rentalDetails.userInfo.name}</p>
                    <p>Email: {rentalDetails.userInfo.email}</p>
                    <p>Address: {rentalDetails.reservationInfo.userAddress} </p>
                    <p>Phone Number: {rentalDetails.reservationInfo.phoneNumber} </p>
                </div>

                <div className="rentalInfoDiv">
                    <p><strong>Rental Information:</strong></p>
                    <p>Pickup Date: {new Date(rentalDetails.reservationInfo.pickupDate).toLocaleDateString()}</p>
                    <p>Drop Date: {new Date(rentalDetails.reservationInfo.dropDate).toLocaleDateString()}</p>
                    <p>Number of Days: {rentalDetails.rentedDays}</p>
                    <p>Price Per Day: ${rentalDetails.pricePerDay}</p>
                    <p>Insurance: {rentalDetails.insuranceFee ? 'Yes' : 'No'}</p>
                    <p>Cleaning: {rentalDetails.cleaningFee ? 'Yes' : 'No'}</p>
                </div>

                <div className="serInfoDiv">
                    <p><strong>Rental Total Price:</strong></p>
                    <p>Rental Price: ${rentalDetails.rentalPrice}</p>
                </div>

                <div className="serInfoDiv">
                    <p><strong>Additional Charges:</strong></p>
                    <p>Cleaning Fee: ${rentalDetails.cleaningFee}</p>
                    <p>Insurance Fee: ${rentalDetails.insuranceFee}</p>
                </div>

                <div className="totalAmountDiv">
                    <p><strong>Total Amount Due:</strong></p>
                    <p>${rentalDetails.totalAmount}</p>
                </div>

                <div className="payment-actions">
                    <button className="proceedToPayment" onClick={handlePay}>Pay</button>
                </div>

            </div>
        </div>
    );
}

export default Payment;
