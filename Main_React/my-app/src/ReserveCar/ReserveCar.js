import React, { useEffect, useState } from 'react';
import "./ReserveCar.css"
import { useLocation, useNavigate } from "react-router-dom";
import {fetchReservationsForUserById} from "../Admin/ReservationsInfo";

const ReserveCarForm = () => {
    // const [name, setName] = useState('');
    const [userAddress, setUserAddress] = useState('');
    const [phoneNumber, setPhone] = useState('');
    const [pickupDate, setPickupDate] = useState('');
    const [dropDate, setReturnDate] = useState('');
    const [driverLicense, setDriverLicense] = useState('');
    const [insurance, setInsurance] = useState(false);
    const [cleaning, setCleaning] = useState(false);
    const [carInfo, setCarInfo] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const carId = location.state?.id;
    const userId = localStorage.getItem("userId");
    const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
    const [reservationId, setReservationId] = useState(0);


    const handleAddressChange = (event) => {
        setUserAddress(event.target.value);
        // console(userAddress.toString())
    };
    const handlePhoneChange = (event) => {
        setPhone(event.target.value);
    };
    const handleDriverLicenseChange = (event) => {
        setDriverLicense(event.target.value);
    };
    const handleInsuranceChange = (event) => {
        setInsurance(event.target.checked);
    };
    const handleCleaningChange = (event) => {
        setCleaning(event.target.checked);
    };


    const handleDateChangeStart = (event) => {
        setPickupDate(event.target.value);
    };

    const handleDateChangeEnd = (event) => {
        setReturnDate(event.target.value);
    };


//     const sendConfirmationEmail = async (userId, reservationId) => {
//     alert("email okkkkk")
//     alert(reservationId)
//
//
// }

    const findReservationByPickUpDate = async () => {
        const reservations = await fetchReservationsForUserById(userId);

        // Convert pickupDate to match the format in reservations (assuming it's in YYYY-MM-DD format)
        const formattedPickupDate = new Date(pickupDate).toISOString().split('T')[0];

        // Loop through reservations to find matching reservation
        for (const reservation of reservations) {
            if (reservation.pickupDate === formattedPickupDate && reservation.car.id === carId) {
                // Matching reservation found, retrieve reservationId
                const reservationId = reservation.id;
                setReservationId(reservationId);
                alert(reservationId);

                try {
                    const response = await fetch(`http://localhost:8080/users/${userId}/mailConfirmation/${reservationId}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });

                    if (!response.ok) {
                        throw new Error('Failed to send confirmation email');
                    }

                    alert('Confirmation email sent successfully');
                    return response.json();

                } catch (error) {
                    console.error('Error:', error);
                    alert("Failed to send email");
                }
            }
        }
    }

    const handleSubmitReserveCar = async (e) => {
        e.preventDefault();

        // Prompt confirmation dialog
        const confirmed = window.confirm("Please verify the booking information.\nCar: " + carInfo.name + " " + carInfo.model + " " + carInfo.year +
            "\nColor: " + carInfo.color + "\nPrice: " + carInfo.price + "$/day\nMax Mileage Per Day: " + carInfo.milage +
            "\nCar Insurance Selected (for 70$/day): " + insurance + "\nCleaning Selected (for 35$/day): " + cleaning +
            "\n\nYour Info:\nAddress: " + userAddress + "\nPhone Number: " + phoneNumber + "\nDriver's License Number: " + driverLicense);

        if (!confirmed) {
            return; // If user clicks cancel, do nothing
        }

        // Prompt for account number
        const cardNum = prompt("Please enter your card number:");
        if (cardNum === null) {
            return; // If user cancels the prompt, do nothing
        }
        else{
            try {
                const pickedUp = false
                const returned = false
                const response = await fetch(`http://localhost:8080/users/${userId}/reservations`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({pickupDate, dropDate, car: {id: carId},userAddress, phoneNumber, driverLicense, insurance, cleaning,pickedUp,returned, cardNum}),
                    // public Reservation(ObjectIdString driverLicense, boolean insurance, boolean cleaning, boolean pickedUp, boolean returned, String cardNum) {

                });


                if (!response.ok) {

                    throw new Error('Failed to reserve the car');
                }
                const data = await response.json();
                await findReservationByPickUpDate(userId)

                    navigate('/myProfile');

                console.log('Car reserved successfully');

            } catch (err) {
                alert("Failed to reserve the car");
            }
        }

    };


    const displayCarInfo = async () => {
        const signInUrl = `http://localhost:8080/cars/${carId}`;

        try {
            const response = await fetch(signInUrl, { method: "GET" });
            const carsData = await response.json();
            setCarInfo(carsData);
        } catch (error) {
            console.log(error.info.toString());
        }
    };

    useEffect(() => {
        displayCarInfo();
    }, []);

    return (
        <div className="reservationForm">
            <div action="" className="carInfoWrapper">
                <h1 className="carModelHeader">{carInfo.name} {carInfo.model} {carInfo.year}</h1>
                <img src={carInfo.imageUrl} className="reserveCarImg"/>
                <div className='carInfoContainer'>
                    <h2>{carInfo.price}$/day </h2>
                </div>
            </div>
            <div className="formWrapperDiv">
                <div>
                    <h3>{carInfo.info}</h3>
                </div>
                <form onSubmit={handleSubmitReserveCar} className="formWrapper">
                    <h1>Reserve This Car Now</h1>
                    <h2>This car's Pickup and Drop off branch is: <u>{carInfo.branch?.name}</u></h2>
                    <h3>The address of this branch is: <u>{carInfo.branch?.address}</u></h3>
                    <div className="inputBoxReserve date-picker-group" id="#">
                        <label htmlFor="#" className="#">Your Address:</label>
                        <input type="text" id="#" className="#" required onChange={handleAddressChange}/>
                    </div>
                    <br/>
                    <div className="inputBoxReserve date-picker-group" id="#">
                        <label htmlFor="#" className="#">Phone Number:</label>
                        <input type="text" id="#" className="#" required onChange={handlePhoneChange}/>
                    </div>
                    <br/>
                    <div className="inputBoxReserve date-picker-group" id="#">
                        <label htmlFor="#" className="#">Driver License Number:</label>
                        <input type="text" id="#" className="#" required onChange={handleDriverLicenseChange}/>
                    </div>
                    <br/>
                    <div className="checkbox-container">
                        <label className="checkboxLabel">
                            <input type="checkbox" className="checkbox-input" onChange={handleInsuranceChange}/>
                            Car Insurance (70$/day)
                        </label>
                        <label className="checkboxLabel">
                            <input type="checkbox" className="checkbox-input" onChange={handleCleaningChange}/>
                            Car Cleaning (35$/reservation)
                        </label>
                    </div>


                    <div className="date-wrapper">
                        <div className="inputBoxReserve date-picker-group" id="pickupDateDiv">
                            <label htmlFor="pickupDateInput" className="dateInputLabel">Pickup Date:</label>
                            <input type="date" id="pickupDateInput" className="datePickerReserve" value={pickupDate}
                                   onChange={handleDateChangeStart} min={currentDate} max={dropDate} required/>
                        </div>
                        <div className="inputBoxReserve date-picker-group" id="returnDateDiv">
                            <label htmlFor="returnDateInput" className="dateInputLabel">Return Date:</label>
                            <input type="date" id="returnDateInput" className="datePickerReserve" value={dropDate}
                                   onChange={handleDateChangeEnd} min={pickupDate || currentDate} required/>
                        </div>
                    </div>
                    <br/>
                    <button type="submit" className="reserveBtn">Reserve</button>
                </form>
            </div>
        </div>
    );
};

export default ReserveCarForm;
