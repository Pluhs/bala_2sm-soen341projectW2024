import React, { useState, useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import "./BrowseVehicle.css";
import "../ReserveCar/ReserveCar";
import {createUser} from "../LogInForm/UserInfo";

function BrowseVehicle() {
    // State to store the car data
    const [cars, setCars] = useState([]);

    const [branchFilter, setBranchFilter] = useState("ShowAll");
    const [makeFilter, setMakeFilter] = useState("ShowAll");
    const [colorFilter, setColorFilter] = useState("ShowAll");
    const [typeFilter, setTypeFilter] = useState("ShowAll");
    const [minYearFilter, setMinYearFilter] = useState("");
    const [maxYearFilter, setMaxYearFilter] = useState("");
    const [minPriceFilter, setMinPriceFilter] = useState("");
    const [maxPriceFilter, setMaxPriceFilter] = useState("");
    const [showFilters, setShowFilters] = useState(false);
    // const [plusIconRotate, setPlusIconRotate] = useState(false);
    const [iconRotation, setIconRotation] = useState(0); // State for icon rotation

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
            (minYearFilter === "" || car.year >= parseInt(minYearFilter)) &&
            (maxYearFilter === "" || car.year <= parseInt(maxYearFilter)) &&
            (minPriceFilter === "" || car.price >= parseInt(minPriceFilter)) &&
            (maxPriceFilter === "" || car.price <= parseInt(maxPriceFilter))
        );
    };
    // const handleShowFilters = async (e) => {
    //     e.preventDefault();
    //         setShowFilters(false);
    // };


    const toggleFilters = () => {
        setShowFilters(!showFilters);
        // Rotate the plus icon
        setIconRotation(iconRotation === 0 ? -135 : 0);
    }


    return (
        <div className="browseVehiclesContainer">
            <div className="filterHeader">
                <h1>Filter by: <i className="fa fa-plus" onClick={toggleFilters} style={{
                    transform: `rotate(${iconRotation}deg)`,
                    transition: 'transform 0.65s ease'
                }}></i></h1>
            </div>
            {showFilters && (
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
                        <label>Year Range: </label>
                        <input type="number" id="minYearFilterOption" className="filterInputGeneral numberInputFilter" value={minYearFilter}
                               onChange={(e) => setMinYearFilter(e.target.value)} min='1960' max="2050"/>
                        <label> to </label>
                        <input type="number" id="maxYearFilterOption" className="filterInputGeneral numberInputFilter" value={maxYearFilter}
                               onChange={(e) => setMaxYearFilter(e.target.value)} min='1960' max="2050"/>
                    </div>

                    <div>
                    <label>Price range: </label>
                    <input type="number" id="minPriceFilterOption" className="filterInputGeneral numberInputFilter" value={minPriceFilter}
                           onChange={(e) => setMinPriceFilter(e.target.value)} min='0'/>
                    <label> to </label>
                    <input type="number" id="maxPriceFilterOption" className="filterInputGeneral numberInputFilter" value={maxPriceFilter}
                           onChange={(e) => setMaxPriceFilter(e.target.value)} min='0'/>
                </div>

            </div>
            )}
            <div className="vehicle-container">
            {cars.filter(filterCars).map(car => (
                    <div key={car?.id} to={`/${car?.name}`} className="vehicle" style={{textDecoration: 'none'}}>
                        <img className="imgBrowseVehicles" src={car?.imageUrl} alt={`${car?.name} ${car?.model} ${car?.year}`}/>
                        <h3>{`${car?.name} ${car?.model} ${car?.year}`}</h3>
                        <p className="browseCarInfo">{car?.color} {car?.type}</p>
                        <p className="browseCarInfo">{car?.info}</p>
                        <p className="browseCarInfo"><b>Available at:</b> {car?.branch?.name}</p>
                        <div className="priceBtnDiv">
                            <p className="browseCarPrice">{car?.price}$/day</p>
                            <button onClick={() => handleGetCarIdOnReserve(car?.id)} className="reserveVehicleBtnBrowse">
                                Reserve
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default BrowseVehicle;
