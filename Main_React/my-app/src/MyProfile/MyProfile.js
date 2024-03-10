import React, {useEffect, useState} from 'react';
import "./MyProfile.css"


const MyProfile = () => {


    // const [name, setName] = useState("");
    // const [password,setPassword] = useState('');
    // const [oldPassword] = useState('');
    // const [newPassword] = useState('');
    // const [confirmNewPassword] = useState('');
    const [reservations, setReservations] = useState([]);


    // Simulate fetching reservations from a database (replace with actual API call)
    // const fetchReservations = async () => {
    //     const response = await fetch('http://your-api-endpoint/reservations'); // Replace with your API endpoint
    //     const data = await response.json();
    //     setReservations(data);
    // };

    useEffect(() => {
        // fetchReservations(); // Fetch reservations on component mount
        const fetchReservationList = [
            { id: 1, pickupDate: "2024-04-10", dropDate: "2024-04-15", location: "Saint-Laurent",
                car: {name: "Toyota Camry 2015", price: 80.00, info: "A sedan, excellent for city drives",
                    imageUrl: "/Images/toyota2015.jpg"}},

            { id: 2, pickupDate: "2024-04-18", dropDate: "2024-04-21", location: "Old Montreal",
                car: {name: "Peugeot 505 1989", price: 30.99, info: "A great car for road trips",
                    imageUrl: "/Images/Peugeot505.jpg"}},

            { id: 3, pickupDate: "2024-05-02", dropDate: "2024-05-08", location: "Airport",
                car: {name: "BMW I8 2020", price: 11.79, info: "A fast fancy car",
                    imageUrl: "/Images/BMW2020.jpg"}}

        ]; setReservations(fetchReservationList);
    }, []);

    // const handleNameChange = (event) => {
    //     setName(event.target.value);
    // };
    //
    // const handlePasswordChange = (event) => {
    //     setPassword(event.target.value);
    // };

    // Form submission handler (replace with actual logic for updating name and password)
    // const handleSubmitName = (event) => {
    //     event.preventDefault();
    //     console.log('Name:', name, 'Password:', password); // Replace with API call to update user info
    //     setName(''); // Clear form fields after submission (optional)
    //     setPassword('');
    // };


    return (

        <div className="myProfile">
            {/*<h1>Hello NAME</h1>*/}

            {/*<section className="user-info-section">*/}
            {/*    <h2>Update Name</h2>*/}
            {/*    <form onSubmit={handleSubmitName}>*/}
            {/*        <label htmlFor="name">Name:</label>*/}
            {/*        <input type="text" id="name" value={name} onChange={handleNameChange}/>*/}

            {/*        <label htmlFor="password">Password:</label>*/}
            {/*        <input type="password" id="password" value={password} onChange={handlePasswordChange}/>*/}

            {/*        <button type="submit">Update</button>*/}
            {/*    </form>*/}
            {/*    <h2>Update Password</h2>*/}
            {/*    <form onSubmit={"#"}>*/}
            {/*        <label htmlFor="oldPassword">Old Password:</label>*/}
            {/*        <input type="text" id="oldPassword" value={"#"} onChange={handleNameChange}/>*/}

            {/*        <label htmlFor="newPassword">Password:</label>*/}
            {/*        <input type="password" id="newPassword" value={"#"} onChange={handlePasswordChange}/>*/}

            {/*        <label htmlFor="confirmNewPassword">Password:</label>*/}
            {/*        <input type="password" id="confirmNewPassword" value={"#"}*/}
            {/*               onChange={handlePasswordChange}/>*/}

            {/*        <button type="submit">Update</button>*/}
            {/*    </form>*/}
            {/*</section>*/}


            {/*##########################*/}

            {/*<section className="reservations-section">*/}
                <h1>Your Reservations:</h1>


                {}
            {reservations.length > 0 ? (
                <div>
                    {reservations.map(reservation => (
                        <div key={reservation.id} className="yourReservationContainer">
                            <img src={reservation.car.imageUrl} className="yourReservationCarImg"/>
                            <div className="leftContent">
                                <b className="carInfoTxt">{reservation.car.name} </b>
                                <b className="startDateTxt">Pickup Date: {reservation.pickupDate} </b>
                            </div>
                            <div className="rightContent">
                                <b className="price">Price: {reservation.car.price}$/day </b>
                                <b className="endDateTxt">Return Date: {reservation.dropDate} </b>
                            </div>
                            <div className="deleteReservationBtnContainer">
                                <button type="button" className="deleteReservationBtn" formAction="#">Cancel Reservation
                                </button>
                            </div>
                        </div>


                    ))}
                </div>
            ) : (
            <p>You don't have any upcoming reservations.</p>
            )}



            {/*<div className="yourReservationContainer">*/}
                {/*    <img src="/Images/Peugeot505.jpg" className="yourReservationCarImg"/>*/}
                {/*    <div className="topContent">*/}
                {/*        <b className="carInfoTxt">AATESTTESTTEST </b>*/}
                {/*        <b className="locationTxt">AATESTTESTTEST2 </b>*/}
                {/*    </div>*/}
                {/*    <div className="bottomContent">*/}
                {/*        <b className="startDateTxt">AATESTTESTTEST3 </b>*/}
                {/*        <b className="endDateTxt">AATESTTESTTEST5 </b>*/}
                {/*    </div>*/}
                {/*    <div className="deleteReservationBtnContainer">*/}
                {/*        <button type="button" className="deleteReservationBtn" formAction="#">Delete Reservation</button>*/}
                {/*    </div>*/}
                {/*</div>*/}
                {/*<div className="yourReservationContainer">*/}
                {/*    <img src="/Images/BMW2020.jpg" className="yourReservationCarImg"/>*/}
                {/*    <div className="topContent">*/}
                {/*        <b className="carInfoTxt">AATESTTESTTEST </b>*/}
                {/*        <b className="locationTxt">AATESTTESTTEST2 </b>*/}
                {/*    </div>*/}
                {/*    <div className="bottomContent">*/}
                {/*        <b className="startDateTxt">AATESTTESTTEST3 </b>*/}
                {/*        <b className="endDateTxt">AATESTTESTTEST5 </b>*/}
                {/*    </div>*/}


                {/*</div>*/}
            {/*</section>*/}
        </div>
    );

}

export default MyProfile;
