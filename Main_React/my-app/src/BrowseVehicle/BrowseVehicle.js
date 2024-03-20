import React, { useState, useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import "./BrowseVehicle.css";
import "../ReserveCar/ReserveCar";

function BrowseVehicle() {
    // State to store the car data
    const [cars, setCars] = useState([]);
    let navigate = useNavigate()


    const handleGetCarIdOnReserve = (id) => {

        navigate('/reserveCar',{state:{id: id} } )
    }

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


    return (
        <div className="browseVehiclesContainer">
            <div className="filterHeader">
                <h1>Filter by:</h1>
            </div>
            <div className="filterOptionsContainer">
                <div>
                    <label htmlFor="makeFilterOption">Make: </label>
                    <select id="makeFilterOption" className="filterInputGeneral">
                        <option value="option1">Default</option>
                        <option value="option2">Location 2</option>
                        <option value="option3">Location 3</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="colorFilterOption">Color: </label>
                    <select id="colorFilterOption" className="filterInputGeneral">
                        <option value="Default">Default</option>
                        <option value="White">White</option>
                        <option value="Silver">Silver</option>
                        <option value="Grey">Grey</option>
                        <option value="Blue">Blue</option>
                        <option value="Orange">Orange</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="typeFilterOption">Type: </label>
                    <select id="typeFilterOption" className="filterInputGeneral">
                        <option value="option1">Default</option>
                        <option value="Sedan">Sedan</option>
                        <option value="SUV">SUV</option>
                        <option value="SportsCar">Sports Car</option>
                        {/*<option value="Truck">Truck</option>*/}
                    </select>
                </div>
                <div>
                <label htmlFor="yearFilterOption">Year: </label>
                    <input type="text" id="yearFilterOption" className="filterInputGeneral" />

                </div>
                <div>
                    <label>Price range: </label>
                    <input type="number" id="minPriceFilterOption" className="filterInputGeneral"/>
                    <label> to </label>
                    <input type="number" id="maxPriceFilterOption" className="filterInputGeneral"/>
                </div>

            </div>

            <div className="vehicle-container">
                {}
                {cars.map(car => (
                    <div key={car.id} to={`/${car.name}`} className="vehicle" style={{textDecoration: 'none'}}>
                        <img src={car.imageUrl} alt={`${car.name} ${car.model} ${car.year}`}/>
                        <h3>{`${car.name} ${car.model} ${car.year}`}</h3>
                        <p className="browseCarInfo">{car.color} {car.type}</p>
                        <p className="browseCarInfo">{car.info}</p>
                        <p className="browseCarInfo">Available at: {car.branch.name}</p>
                        <p className="browseCarPrice">{car.price}$/day</p>
                        <button onClick={() => handleGetCarIdOnReserve(car.id)}>
                            Reserve
                        </button>

                    </div>
                ))}
            </div>
        </div>
    );
}

export default BrowseVehicle;
