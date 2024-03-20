import React, { useState, useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import "./BrowseVehicle.css";
import "../ReserveCar/ReserveCar";

function BrowseVehicle() {
    // State to store the car data
    const [cars, setCars] = useState([]);

    const [branchFilter, setBranchFilter] = useState("ShowAll");
    const [makeFilter, setMakeFilter] = useState("ShowAll");
    const [colorFilter, setColorFilter] = useState("ShowAll");
    const [typeFilter, setTypeFilter] = useState("ShowAll");
    const [yearFilter, setYearFilter] = useState("");
    const [minPriceFilter, setMinPriceFilter] = useState("");
    const [maxPriceFilter, setMaxPriceFilter] = useState("");

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

    const filterCars = (car) => {
        return (
            (branchFilter === "ShowAll" || car.branch.name === branchFilter) &&
            (makeFilter === "ShowAll" || car.name === makeFilter) &&
            (colorFilter === "ShowAll" || car.color === colorFilter) &&
            (typeFilter === "ShowAll" || car.type === typeFilter) &&
            (yearFilter === "" || car.year.toString() === yearFilter) &&
            (minPriceFilter === "" || car.price >= parseInt(minPriceFilter)) &&
            (maxPriceFilter === "" || car.price <= parseInt(maxPriceFilter))
        );
    };


    return (
        <div className="browseVehiclesContainer">
            <div className="filterHeader">
                <h1>Filter by:</h1>
            </div>
            <div className="filterOptionsContainer">
                <div>
                    <label htmlFor="branchFilterOption">Branch: </label>
                    <select id="branchFilterOption" className="filterInputGeneral" value={branchFilter}
                            onChange={(e) => setBranchFilter(e.target.value)}>
                        <option value="ShowAll">Show All</option>
                        <option value="Dorval Location">Dorval Location</option>
                        <option value="Peel Plaza">Peel Plaza</option>
                        <option value="Saint-Jacques Estate">Saint-Jacques Estate</option>
                        <option value="Henri-Julien Hub">Henri-Julien Hub</option>
                        <option value="Montagne Suites">Montagne Suites</option>
                        <option value="Le Corbusier Center">Le Corbusier Center</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="makeFilterOption">Make: </label>
                    <select id="makeFilterOption" className="filterInputGeneral" value={makeFilter}
                            onChange={(e) => setMakeFilter(e.target.value)}>
                        <option value="ShowAll">Show All</option>
                        <option value="Toyota">Toyota</option>
                        <option value="BMW">BMW</option>
                        <option value="Porsche">Porsche</option>
                        <option value="Honda">Honda</option>
                        <option value="Nissan">Nissan</option>
                        <option value="Dodge">Dodge</option>
                        <option value="Hyundai">Hyundai</option>
                    </select>
                </div>



                <div>
                    <label htmlFor="colorFilterOption">Color: </label>
                    <select id="colorFilterOption" className="filterInputGeneral" value={colorFilter}
                            onChange={(e) => setColorFilter(e.target.value)}>
                        <option value="ShowAll">Show All</option>
                        <option value="White">White</option>
                        <option value="Silver">Silver</option>
                        <option value="Grey">Grey</option>
                        <option value="Blue">Blue</option>
                        <option value="Orange">Orange</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="typeFilterOption">Type: </label>
                    <select id="typeFilterOption" className="filterInputGeneral" value={typeFilter}
                            onChange={(e) => setTypeFilter(e.target.value)}>
                        <option value="ShowAll">Show All</option>
                        <option value="Sedan">Sedan</option>
                        <option value="SUV">SUV</option>
                        <option value="Sports Car">Sports Car</option>
                        {/*<option value="Truck">Truck</option>*/}
                    </select>
                </div>
                <div>
                    <label htmlFor="yearFilterOption">Year: </label>
                    <input type="text" id="yearFilterOption" className="filterInputGeneral" value={yearFilter}
                           onChange={(e) => setYearFilter(e.target.value)}/>

                </div>
                <div>
                    <label>Price range: </label>
                    <input type="number" id="minPriceFilterOption" className="filterInputGeneral" value={minPriceFilter}
                           onChange={(e) => setMinPriceFilter(e.target.value)}/>
                    <label> to </label>
                    <input type="number" id="maxPriceFilterOption" className="filterInputGeneral" value={maxPriceFilter}
                           onChange={(e) => setMaxPriceFilter(e.target.value)}/>
                </div>

            </div>

            <div className="vehicle-container">
            {cars.filter(filterCars).map(car => (
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
