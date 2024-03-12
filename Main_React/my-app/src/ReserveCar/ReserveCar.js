// import React from 'react';
import React, {useEffect, useState} from 'react';
import "./ReserveCar.css"
import {useLocation} from "react-router-dom";
// import { Link } from 'react-router-dom';


const ReserveCarForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [pickupDate, setPickupDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [carInfo, setCarInfo] = useState('');

    const location = useLocation();

    const carId = location.state?.id;

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

    // alert(carInfo.price)

    return (
        <div className="reservationForm">
            {/*<h2>Reserve a Car</h2>*/}

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

                <form action="" className="formWrapper">

                    <h1>Reserve This Car Now</h1>
                    {/*<div className="inputBoxReserve">*/}
                    {/*    <input type="text" placeholder='Name' required/>*/}
                    {/*    <i className="fa-solid fa-user"></i>*/}
                    {/*</div>*/}
                    <select id="locationsDropdownMenuReserve" className="locationsDropdownMenu">
                        <option value="option1">Location 1</option>
                        <option value="option2">Location 2</option>
                        <option value="option3">Location 3</option>
                    </select>

                    <br/>
                    <div className="date-wrapper">
                        <div className="inputBoxReserve date-picker-group" id="pickupDateDiv">
                            <label htmlFor="pickupDateInput" className="dateInputLabel">Pickup Date:</label>
                            <input type="date" id="pickupDateInput" className="datePickerReserve" required/>
                        </div>
                        <div className="inputBoxReserve date-picker-group" id="returnDateDiv">
                            <label htmlFor="returnDateInput" className="dateInputLabel">Return Date:</label>
                            <input type="date" id="returnDateInput" className="datePickerReserve" required/>
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