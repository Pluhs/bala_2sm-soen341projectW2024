import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchBranchById, fetchCarsByBranchId } from './BranchInfo';
import './BranchDetails.css'

function BranchDetails() {
    let { id } = useParams();
    const [branch, setBranch] = useState(null);
    const [cars, setCars] = useState([]); // State for cars
    let navigate = useNavigate()

    const handleGetCarIdOnReserve2 = (id) => {

        navigate('/reserveCar',{state:{id: id} } )
    }
    useEffect(() => {
        const fetchData = async () => {
            console.log("Fetching branch and cars for branch ID:", id); // Debugging
            const fetchedBranch = await fetchBranchById(id);
            console.log("Fetched branch:", fetchedBranch); // Debugging
            setBranch(fetchedBranch);
            const fetchedCars = await fetchCarsByBranchId(id);
            console.log("Fetched cars:", fetchedCars); // Debugging
            setCars(fetchedCars);
        };
        fetchData();
    }, [id]);


    if (!branch) {
        return <div>Loading...</div>;
    }

    return (
        <div className="detailsBackground">
            <div className="detailsMainContainer">
                <div className="branchInfoSection">
                    <h2>{branch.name}</h2>
                    <p>Address: {branch.address}</p>
                </div>
                <div className="carsGrid">
                    {cars.map(car => (
                        <div key={car.id} className="carDetailCard">
                            <img src={car.imageUrl} alt={`${car.name} ${car.model} ${car.year}`}
                                 className="carImageDetail"/>
                            <h3 className="carDetailTitle">{`${car.name} ${car.model} ${car.year}`}</h3>
                            <p className="carInfoText">{car.color} {car.type}</p>
                            <p className="carInfoText">{car.info}</p>
                            <p className="carInfoText">Available at: {branch.name}</p>
                            <p className="carPriceDetail">{car.price}$/day</p>
                            {/*<Link to={`/reserveCar`} className="reserveCarButton">Reserve</Link>*/}
                            <button onClick={() => handleGetCarIdOnReserve2(car.id)} className="reserveCarButton">
                                Reserve
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
}

export default BranchDetails;
