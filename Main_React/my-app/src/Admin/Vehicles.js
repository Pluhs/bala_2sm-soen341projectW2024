import React, {useEffect, useState} from 'react';
import "./Vehicles.css"
import {Link} from "react-router-dom";


function Vehicles() {
    const [cars, setCars] = useState([]);

    const displayCars = async () => {
        const signInUrl = `http://localhost:8080/cars/available`;

        try {
            const response = await fetch(signInUrl, { method: "GET" });

            const carsData = await response.json();
            setCars(carsData);
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        displayCars();
    }, []);


    // useEffect(() => {
    //     // fetchReservations(); // Fetch reservations on component mount
    //     const fetchedCars = [
    //         { id: 1, pickupDate: "2024-04-10", dropDate: "2024-04-15", location: "Saint-Laurent",
    //             car: {name: "Toyota Camry 2015", price: 80.00, info: "A sedan, excellent for city drives",
    //                 imageUrl: "/Images/toyota2015.jpg"}},
    //
    //         { id: 2, pickupDate: "2024-04-18", dropDate: "2024-04-21", location: "Old Montreal",
    //             car: {name: "Peugeot 505 1989", price: 30.99, info: "A great car for road trips",
    //                 imageUrl: "/Images/Peugeot505.jpg"}},
    //
    //         { id: 3, pickupDate: "2024-05-02", dropDate: "2024-05-08", location: "Airport",
    //             car: {name: "BMW I8 2020", price: 11.79, info: "A fast fancy car",
    //                 imageUrl: "/Images/BMW2020.jpg"}}
    //
    //     ]; setCars(fetchedCars);
    // }, []);


    return (
        <div className="adminVehicle">
            {}

            {cars.length > 0 ? (
                <div>
                    {cars.map(car => (
                        <div key={car.id} to={`/${car.name}`} className="adminVehicleContainer"
                             style={{textDecoration: 'none'}}>

                            <img src={car.imageUrl} className="adminVehicleImg" alt={"car"}/>
                            <div className="adminTopContent">
                                <b className="adminCarInfoTxt">{car.name} </b>

                            </div>
                            <div className="adminBottomContent">
                                <b className="adminVehiclePrice">Price: {car.price}$/day </b>
                            </div>
                            <div className="buttonsContainerVehicles">
                                <button type="button" className="viewVehicleBtn"
                                        // onClick={() => handleViewUser(user.id)}
                                >Edit Vehicle
                                </button>

                                <button type="button" className="deleteVehicleBtn"
                                        >Delete Vehicle
                                </button>
                            </div>
                        </div>


                    ))}
                </div>
            ) : (
                <p>No cars to display</p>
            )}
        </div>


    );
}

export default Vehicles;
