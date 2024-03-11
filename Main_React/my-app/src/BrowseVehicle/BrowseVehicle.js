import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./BrowseVehicle.css";
import "../ReserveCar/ReserveCar";

function BrowseVehicle() {
    // State to store the car data
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

    // Simulating fetching data from a database
    // useEffect(() => {
    //     // fetch data from your database
    //     // temporary array
    //     const fetchedCars = [
    //         { id: 1, brand: 'Toyota', model: 'Camry', year: 2015, image: '/Images/toyota2015.jpg', description: 'Description of Toyota Camry 2015' },
    //         { id: 2, brand: 'BMW', model: 'i8', year: 2020, image: '/Images/BMW2020.jpg', description: 'Description of BMW i8 2020' },
    //         { id: 3, brand: 'Peugeot', model: '505', year: 1989, image: '/Images/Peugeot505.jpg', description: 'Description of Peugeot 505 1989' },
    //         { id: 2, brand: 'BMW', model: 'i8', year: 2020, image: '/Images/BMW2020.jpg', description: 'Description of BMW i8 2020' },
    //         { id: 2, brand: 'BMW', model: 'i8', year: 2020, image: '/Images/BMW2020.jpg', description: 'Description of BMW i8 2020' },
    //         { id: 2, brand: 'BMW', model: 'i8', year: 2020, image: '/Images/BMW2020.jpg', description: 'Description of BMW i8 2020' },
    //
    //
    //     ];

    // Update the state with the fetched data
    //     setCars(fetchedCars);
    // }, []);

    return (
        <div className="vehicle-container">
            {}
            {cars.map(car => (
                <div key={car.id} to={`/${car.name}`} className="vehicle" style={{textDecoration: 'none'}}>
                    <img src={car.imageUrl} alt={`${car.name}`}/>
                    <h3>{`${car.name} `}</h3>
                    <p className="browseCarInfo">{car.info}</p>
                    <p className="browseCarPrice">${car.price} /day</p>
                    <Link to={`/ReserveCar/`}>
                        <button>Reserve</button>
                    </Link>

                </div>
            ))}
        </div>
    );
}

export default BrowseVehicle;