import React, {useEffect, useState} from 'react';
import "./CheckIn.css"
import {Link, useLocation} from "react-router-dom";
import {fetchUserById,fetchUserReservationById} from '../LogInForm/UserInfo'


const CheckIn = () => {
    const [userReservations, setUserReservations] = useState([]);
    const [reservationObject, setReservationObject] = useState("");
    const [userObject, setUserObject] = useState("");

    const [textInput, setTextInput] = useState('');

    const location = useLocation();
    const reservationID = location?.state?.id;
    const reservationUserID = location?.state?.userID;

    useEffect(() => {
        const fetchAgreementData = async () => {
        try {
            const userObjectInfo = await fetchUserById(reservationUserID);
            const reservationObjectInfo = await fetchUserReservationById(reservationUserID, reservationID);
            if (userObjectInfo && reservationObjectInfo) {
                // const rentalStartDate = new Date(reservationResponse.pickupDate);
                // const rentalEndDate = new Date(reservationResponse.dropDate);
                // const differenceInMilliseconds = rentalEndDate - rentalStartDate;
                // const period = differenceInMilliseconds / (1000 * 3600 * 24);

                setReservationObject(reservationObjectInfo)
                setUserObject(userObjectInfo)
            }

        } catch (error) {
            console.error('Error fetching agreement data', error);
            alert('Error fetching agreement data');
        }
    };
        fetchAgreementData();
    }, [reservationUserID, reservationID]);

    const userId = localStorage.getItem("userId");


    const handleSubmitToSignAgreement = (event) => {
        event.preventDefault(); // Prevent default form submission behavior

        const inputValue = event.target.elements.textarea.value.trim();

        if (inputValue !== '') {
            // Input is not empty
            setTextInput(inputValue); // Save input to a constant (state variable)
            alert(inputValue); // Print an alert with the input value
        } else {
            // Input is empty
            // Ignore it or provide feedback to the user
            alert('Textarea is empty. Ignoring submission.');
        }

    }

    // useEffect(() => {
    //     if (userId) {
    //         fetchUserById(userId).then(result => {
    //             if (result && result.reservations) {
    //                 setUserReservations(result.reservations);
    //             } else {
    //                 setUserReservations([]);
    //             }
    //         }).catch(error => {
    //             console.error('Error fetching user data:', error);
    //             setUserReservations([]);
    //         });
    //     }
    // }, [userId]);


    if (!userId) {
        return (
            <div className="sorryContainer">
                <img src="/Images/unauthorized.png" className="sorryImg" alt="unauthorized" />
                <h3 className="sorryMsg">We are Sorry...</h3>
                <p className="sorryText">Access is denied due to the absence of a valid login session.</p>
                <Link to={`/login`}>
                    <button className="sorryBtn">Go Back To Login Page</button>
                </Link>
            </div>
        );
    }


    return (
        <div className="myProfile">
            <form onSubmit={handleSubmitToSignAgreement}>
                <div>
                    <h1>Confirmation for the following reservation: </h1>
                </div>
                <div>
                    <h2>{reservationObject?.car?.name} by {userObject?.name} to be picked up on {reservationObject?.pickupDate}:</h2>
                </div>
                <div>
                    <h2><u>Please check the following before proceeding to signing the user agreement</u></h2>
                </div>
                    <div>
                    <label className="checkbox-label">
                        <input type="checkbox" className="checkbox-input" required/>
                        User presented their valid booking confirmation ({reservationObject.id})
                    </label>
                </div>

                <div>
                    <label className="checkbox-label">
                        <input type="checkbox" className="checkbox-input" required/>
                        User presented the same driver's license they used to make the booking ({reservationObject.driverLicense})
                    </label>
                </div>
                <div>
                    <label className="checkbox-label">
                        <input type="checkbox" className="checkbox-input" required/>
                        User presented the same credit card they used to make the booking ({reservationObject.cardNum})
                    </label>
                </div>
                <div>
                    <label className="checkbox-label">
                        <input type="checkbox" className="checkbox-input" required/>
                        User inspected the vehicle for any damages, and reported any damages found.
                    </label>
                </div>
                <div className="inputBoxReserve date-picker-group">
                    <h3 className="checkbox-label">Any reported damages to this vehicle: </h3>
                    {/*<input type="text" id="#" className="checkInEntryField"/>*/}

                </div>
                <div>
                    <textarea
                        className="checkInEntryField"
                        name="textarea"
                        placeholder="Enter your text here..."
                    ></textarea>

                </div>
                <button type="submit" className="goToSignBtn">Go to sign user agreement</button>

            </form>


        </div>
    );
}

export default CheckIn;