import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { fetchUserById } from '../LogInForm/UserInfo';
import './ThankYou.css';
import { fetchReservationById } from "../Admin/ReservationsInfo";

const ReserveCarForm = () => {
    const location = useLocation();
    const userId = location?.state?.userId;
    const [paymentDetails, setPaymentDetails] = useState(null);
    const reservationId = location?.state?.reservationId;
    const [reservationDetails, setReservationDetails] = useState(null);

    useEffect(() => {
        const getUserInfo = async () => {
            try {
                const userResponse = await fetchUserById(userId);
                setPaymentDetails(userResponse.paymentDetails);
            } catch (error) {
                console.error('Error fetching user information:', error);
            }
        };

        if (userId) {
            getUserInfo();
        }
    }, [userId]);

    const pay = async () => {
        try {
            if (!paymentDetails) {
                console.error('Payment details not available');
                return;
            }

            const response = await fetch(`http://localhost:8080/users/${userId}/pay`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ creditCardNumber: paymentDetails.creditCardNumber, amount: 500 }),
            });

            if (!response.ok) {
                throw new Error('Failed to process payment');
            }

            console.log('Payment processed successfully');
        } catch (error) {
            console.error('Error processing payment:', error);
        }
    };

    const changePickedUpStatus = async () => {
        try {
            // Fetch reservation details
            const reservationResponse = await fetchReservationById(userId, reservationId);
            const reservation = reservationResponse; // Assuming response contains reservation details

            // Update reservation with pickedUp status
            const response = await fetch(`http://localhost:8080/users/${userId}/reservations/${reservationId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...reservation, pickedUp: true }),
            });

            if (!response.ok) {
                throw new Error('Failed to update reservation');
            }

            console.log('Reservation updated successfully');
        } catch (error) {
            console.error('Error updating reservation:', error);
        }
    };

    useEffect(() => {
        if (paymentDetails) {
            pay();
            changePickedUpStatus();
        }
    }, [paymentDetails]);

    return (
        <div className="ThankYou">
            <h1>Thank You for Checking In!</h1>
            <br/>
            <p>A deposit of $500 was taken from your account and will be reimbursed at checkout.</p>
            <br/>
            <p>Drive away and ENJOY!</p>
            <Link to={`/`}>
                <button className="sorryBtn">Go Back To Home Page</button>
            </Link>
        </div>
    );
};

export default ReserveCarForm;
