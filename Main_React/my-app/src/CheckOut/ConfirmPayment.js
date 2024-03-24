import React, { useEffect, useState } from 'react';
import "./ConfirmPayment.css"
import {Link, useLocation} from "react-router-dom";
import {fetchUserById, fetchUserReservationById} from "../LogInForm/UserInfo";

function ConfirmPayment() {
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(true);
    const [reservationCardNumber, setReservationCardNumber] = useState('')

    const userId = location?.state?.rentalDetails?.userInfo.id;
    const reservationId = location?.state?.rentalDetails?.reservationInfo.id;
    const cardNumber = location?.state?.rentalDetails.cardNumber;
    const paymentAmount = location?.state?.rentalDetails.totalAmount;
    const refundAmount = 500;



    useEffect(() => {
        const fetchReservationData = async () => {
            try {
                const reservation = await fetchUserReservationById(userId, reservationId);
                if(reservation){
                   setReservationCardNumber(reservation.cardNum)
               }

            } catch (error) {
                console.error('Error fetching agreement data', error);
                alert('Error fetching agreement data');
            }
        };
        fetchReservationData();
    }, [userId, reservationId]);

    const refund = async (refundAmount) => {
        try {
            const paymentDetails = { creditCardNumber: cardNumber, amount: refundAmount };
            const response = await fetch(`http://localhost:8080/users/${userId}/refund`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(paymentDetails),
            });

            if (!response.ok) {
                const errorResponse = await response.text();
                console.error('Refund failed:', errorResponse);
                return;
            }
            const successResponse = await response.text();
            console.log('Refund successful:', successResponse);
        } catch (error) {
            console.error('Error making refund:', error);
            alert('An error occurred during the refund. Please try again.');
        }
    };

    const pay = async (paymentAmount) => {
        try {
            const paymentDetails = { creditCardNumber: cardNumber, amount: paymentAmount };
            const response = await fetch(`http://localhost:8080/users/${userId}/pay`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(paymentDetails),
            });

            if (!response.ok) {
                const errorResponse = await response.text();
                console.error('Total payment failed:', errorResponse);
                return;
            }
            const successResponse = await response.text();
            console.log('Payment successful:', successResponse);
        } catch (error) {
            console.error('Error making payment:', error);
            alert('An error occurred during payment. Please try again.');
        }
    };

    const deleteReservation = async (userId, reservationId) => {
        try {
            const response = await fetch(`http://localhost:8080/users/${userId}/reservations/${reservationId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorResponse = await response.text();
                throw new Error(`Failed to delete reservation: ${errorResponse}`);
            }

            // Reservation successfully deleted
            const deletedReservation = await response.json();
            console.log('Deleted reservation:', JSON.stringify(deletedReservation));
            // alert('deleted reservation: ' + deletedReservation)
            return deletedReservation;
        } catch (error) {
            console.error('Error deleting reservation:', error);
            alert('An error occurred while deleting reservation. Please try again.');
        }
    };



    useEffect(() => {
        const processPayment = async () => {
            await pay(paymentAmount);
            await refund(refundAmount);
            setIsLoading(false);
            await deleteReservation(userId, reservationId);
        };

        processPayment();
    }, [paymentAmount, refundAmount, userId, cardNumber]);

    if (isLoading) {
        return <div className="centered-container">Loading...</div>;
    }

    return (
        <div className="ThankYou">
            <h1>Thank You for Checking Out!</h1>
            <br/>
            <p>The final payment of ${paymentAmount} was successfully processed from your account ending with  ****{cardNumber.slice(-4)}. </p>
            <p>The $500 deposit was successfully refunded to the bank account used for reservation ending with ****{reservationCardNumber.slice(-4)}.</p>
            <p>Reservation with booking id: {reservationId} will be erased from our systems</p>
            <p>Thank you for using our services, hope to see you again soon!</p>
            <Link to={`/`}>
                <button className="sorryBtn">Go Back To Home Page</button>
            </Link>
        </div>
    );
}

export default ConfirmPayment;
