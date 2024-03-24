import React, {useEffect, useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import './ThankYou.css';
import {fetchReservationById, updateReservationById} from "../Admin/ReservationsInfo";

const ReserveCarForm = () => {
    const location = useLocation();
    const userId = location?.state?.userId;
    const reservationId = location?.state?.reservationId;
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        changePickUpStatus();
    }, []);

    const changePickUpStatus = async () => {
        try {
            const reservationDetails = await fetchReservationById(userId, reservationId);
            if (!reservationDetails) {
                console.error('Failed to fetch reservation details');
                setIsLoading(false);
                return;
            }
            const updatedReservationDetails = {...reservationDetails, pickedUp: true};
            await updateReservationById(userId, reservationId, updatedReservationDetails);
            const paymentAmount = 500;
            await pay(paymentAmount);
        } catch (error) {
            console.error('Error updating pickup status:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const pay = async (amount) => {
        try {
            const paymentDetails = {amount};
            const response = await fetch(`http://localhost:8080/users/${userId}/pay`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(paymentDetails),
            });

            if (!response.ok) {
                const errorResponse = await response.text();
                console.error('Payment failed:', errorResponse);
                alert(`Payment failed: ${errorResponse}`);
                return;
            }
            const successResponse = await response.text();
            console.log('Payment successful:', successResponse);
            alert(`Payment successful: ${successResponse}`);
        } catch (error) {
            console.error('Error making payment:', error);
            alert('An error occurred during payment. Please try again.');
        }
    };

    if (isLoading) {
        return <div className="centered-container">Loading...</div>;
    }

    return (
        <div className="ThankYou">
            <h1>Thank You for Checking In!</h1>
            <br/>
            <p>A deposit of $500 was taken from your account and will be reimbursed at checkout.</p>
            <Link to={`/`}>
                <button className="sorryBtn">Go Back To Home Page</button>
            </Link>
        </div>
    );
};

export default ReserveCarForm;
