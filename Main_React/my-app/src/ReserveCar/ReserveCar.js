// import React from 'react';
import React, {useEffect, useState} from 'react';
import "./ReserveCar.css"
import {useLocation} from "react-router-dom";
// import { Link } from 'react-router-dom';
import axios from 'axios'; // Import Axios for making HTTP requests


const ReserveCarForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    // const [pickupDate, setPickupDate] = useState(new Date());
    // const [returnDate, setReturnDate] = useState(new Date());
    const [pickupDate, setPickupDate] = useState('');
    const [dropDate, setReturnDate] = useState('');

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [carInfo, setCarInfo] = useState('');

    const location = useLocation();

    const carId = location.state?.id;

    const userId = localStorage.getItem("userId");

    // alert(carId)

    const handleDateChangeStart = (event) => {
        setPickupDate(event.target.value);
        // console.log(pickupDate)
    };

    const handleDateChangeEnd = (event) => {
        setReturnDate(event.target.value);
        // console.log(returnDate)
    };




    const handleSubmitReserveCar = async (e) => {
        e.preventDefault();


        try {
            const response = await fetch(`http://localhost:8080/users/${userId}/reservations`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({pickupDate, dropDate, car: {id: carId}}),
            });

            if (!response.ok) {
                throw new Error('Failed to reserve the car');
            }

            // Optionally, handle successful reservation
            console.log('Car reserved successfully');
        } catch (err) {
            alert("Failed to reserve the car");
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
    }

    useEffect(() => {
        displayCarInfo();
    }, []);


    return (
        <div className="reservationForm">

            <div action="" className="carInfoWrapper">

                <h1 className="carModelHeader">{carInfo.name}</h1>

                <img src={carInfo.imageUrl} className="reserveCarImg"/>

                <div className='carInfoContainer'>
                    <h2>{carInfo.price}$/day </h2>
                    {/*<br/>*/}
                    {/*<b>MORE INFO ABOUT THE VEHICLE</b>*/}

                </div>

            </div>

            <div className="formWrapperDiv">

                <div>

                    <h3>{carInfo.info}</h3>

                </div>

                <form onSubmit={handleSubmitReserveCar} className="formWrapper">

                    <h1>Reserve This Car Now</h1>
                    <select id="locationsDropdownMenuReserve" className="locationsDropdownMenu">
                        <option value="option1">Location 1</option>
                        <option value="option2">Location 2</option>
                        <option value="option3">Location 3</option>
                    </select>

                    <br/>
                    <div className="date-wrapper">
                        <div className="inputBoxReserve date-picker-group" id="pickupDateDiv">
                            <label htmlFor="pickupDateInput" className="dateInputLabel">Pickup Date:</label>
                            <input type="date" id="pickupDateInput" className="datePickerReserve" value={pickupDate} onChange={handleDateChangeStart} required/>
                        </div>
                        <div className="inputBoxReserve date-picker-group" id="returnDateDiv">
                            <label htmlFor="returnDateInput" className="dateInputLabel">Return Date:</label>
                            <input type="date" id="returnDateInput" className="datePickerReserve" value={dropDate} onChange={handleDateChangeEnd} required/>
                        </div>
                    </div>
                    <br/>

                    <button type="submit" className="reserveBtn">Reserve</button>
                </form>
            </div>
        </div>


    )
        ;
};

export default ReserveCarForm;