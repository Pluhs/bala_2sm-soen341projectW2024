import React, {useEffect, useState} from 'react';
import "./Vehicles.css"


function Vehicles() {
    const [cars, setCars] = useState([]);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [newVehicle, setNewVehicle] = useState({ name: '', email: '', info: '', imageUrl: '' });
    const [isLoading, setIsLoading] = useState(true);
    const [editingVehicle, setEditingVehicle] = useState(null);

    const [iconRotation, setIconRotation] = useState(0); // State for icon rotation


    const loadVehiclesList = async () => {
        setIsLoading(true);
        const fetchedCars = await displayCars();
        setCars(fetchedCars);
        setIsLoading(false);
    };

    const createVehicle = async (vehicleData) => {
        try {
            const response = await fetch(`http://localhost:8080/cars`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(vehicleData),
            });
            if (!response.ok) {
                throw new Error('Error creating vehicle');
            }
            return await response.json();
        } catch (error) {
            console.error('Error creating vehicle:', error);
            return null;
        }
    };
    const handleSubmitNewVehicle = async (e) => {
        e.preventDefault();
        const isSuccess = await createVehicle(newVehicle);
        if (isSuccess) {
            setShowCreateForm(false);
            setNewVehicle({ name: '', price: '', info: '', imageUrl: ''  }); // Reset form fields
            await loadVehiclesList();
        } else {
            alert("Failed to create the vehicle.");
        }
    };

    const deleteVehicle = async (id) => {
        try {
            const queryParams = new URLSearchParams({ id });
            const response = await fetch(`http://localhost:8080/cars/${id}?${queryParams}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                console.error('Failed to delete vehicle with response status:', response.status);
                throw new Error('Error deleting user');
            }
            return true;
        } catch (error) {
            console.error('Error deleting vehicle:', error);
            return false;
        }
    };

    const handleDeleteVehicle = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this vehicle?");

        if (confirmDelete) {
            const isSuccess = await deleteVehicle(id);
            if (isSuccess) {
                setCars(cars.filter(car => car.id !== id));
            } else {
                alert("Failed to delete the vehicle.");
            }
        } else {
            // If the user cancels, do nothing
            console.log("Deletion cancelled by user.");
        }
    };

    const handleSaveEdit = async (e) => {
        e.preventDefault();
        await updateVehicle(editingVehicle.id, editingVehicle);
        await loadVehiclesList();
        setEditingVehicle(null);
    };
    const updateVehicle = async (id, vehicleData) => {
        try {
            const response = await fetch(`http://localhost:8080/cars/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(vehicleData),
            });
            if (!response.ok) {
                throw new Error('Error updating vehicle');
            }
            return await response.json();
        } catch (error) {
            console.error('Error updating vehicle:', error);
            return null;
        }
    };


    const displayCars = async () => {
         const response = await fetch(`http://localhost:8080/cars`);

        try {
            if (!response.ok) {
                throw new Error('Error fetching users');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching users:', error);
            return [];
        }
    }

    // const fetchAllUsers = async () => {
    //     try {
    //         const response = await fetch(`http://localhost:8080/users`);
    //         if (!response.ok) {
    //             throw new Error('Error fetching users');
    //         }
    //         return await response.json();
    //     } catch (error) {
    //         console.error('Error fetching users:', error);
    //         return [];
    //     }
    // };

    useEffect(() => {
        loadVehiclesList();
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

    // if (isLoading) return <div>Loading...</div>;

    const toggleNewCars = () => {
        setShowCreateForm(!showCreateForm);
        // Rotate the plus icon
        setIconRotation(iconRotation === 0 ? -135 : 0);
    }

    return (
        <div className="adminVehicle">
            {}

            <h1>ALL VEHICLES: <i className="fa fa-plus" onClick={toggleNewCars} style={{
                transform: `rotate(${iconRotation}deg)`,
                transition: 'transform 0.65s ease'
            }}></i></h1>
            {showCreateForm && (
                <form onSubmit={handleSubmitNewVehicle} className="createVehicleForm">
                    <input
                        type="text"
                        placeholder="Brand"
                        value={newVehicle.name}
                        onChange={(e) => setNewVehicle({...newVehicle, name: e.target.value})}
                    />
                    <input
                        type="text"
                        placeholder="Price"
                        value={newVehicle.price}
                        onChange={(e) => setNewVehicle({...newVehicle, price: e.target.value})}
                    />
                    <input
                        type="text"
                        placeholder="Information about the vehicle"
                        value={newVehicle.info}
                        onChange={(e) => setNewVehicle({...newVehicle, info: e.target.value})}
                    />
                    <input
                        type="text"
                        placeholder="Image URL"
                        value={newVehicle.imageUrl}
                        onChange={(e) => setNewVehicle({...newVehicle, imageUrl: e.target.value})}
                    />
                    <button type="submit">Create Vehicle</button>
                </form>
            )}
            {editingVehicle && (
                <form onSubmit={handleSaveEdit} className="createUserForm">
                    <div className="static-info-container">
                        <label>Car: {editingVehicle.name}</label>
                    </div>
                    <div className="input-icon-container">
                        <p className="static-info-container">Price:</p>
                        <input
                            type="text"
                            placeholder="Price"
                            value={editingVehicle.price}
                            onChange={(e) => setEditingVehicle({...editingVehicle, price: e.target.value})}
                        />
                        <p className="static-info-container">    Info:</p>
                        <input
                            type="text"
                            placeholder="Info"
                            value={editingVehicle.info}
                            onChange={(e) => setEditingVehicle({...editingVehicle, info: e.target.value})}
                        />
                    </div>
                    <div className="form-buttons-container">
                        <button type="submit" className="viewUserBtn">Save Changes</button>
                        <button type="button" onClick={() => setEditingVehicle(null)} className="cancelBtn">Cancel
                        </button>
                    </div>
                </form>
            )}
            {cars.length > 0 ?
                (
                <div>
                    {cars.map(car => (
                        <div key={car.id} to={`/${car.name}`} className="adminVehicleContainer"
                             style={{textDecoration: 'none'}}>

                            <img src={car.imageUrl} className="adminVehicleImg" alt={"car"}/>
                            <div className="adminTopContent">
                                <b className="adminCarName">{car.name} {car.model} {car.year} </b>


                            </div>
                            {/*<p className="adminVehicleInfo">{car.color} {car.type}</p>*/}
                            <p className="adminVehicleInfo">{car.color} {car.type}<br/>{car.info}</p>


                            <div className="adminBottomContent">
                                <b className="adminVehiclePrice">Price: {car.price}$/day </b>

                            </div>

                            <div className="buttonsContainerVehicles">

                                {/*<button type="button" className="editVehicleBtn"*/}
                                {/*>Edit Vehicle*/}
                                {/*</button>*/}

                                <i className="fas fa-edit"  onClick={() => setEditingVehicle(car)}></i>

                                <button type="button" className="deleteVehicleBtn"
                                        onClick={() => handleDeleteVehicle(car.id)}
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
