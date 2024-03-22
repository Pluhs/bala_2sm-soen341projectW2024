import React, {useEffect, useState} from 'react';
import "./CheckOut.css"
import {Link, useLocation} from "react-router-dom";
import {fetchUserById, fetchUserReservationById} from "../LogInForm/UserInfo";
import * as events from "events";


const CheckOut = () => {
    const [reservationObject, setReservationObject] = useState("");
    const [userObject, setUserObject] = useState("");
    const location = useLocation();
    const reservationID = location?.state?.id;
    const reservationUserID = location?.state?.userID;

    const [payWithCard, setPayWithCard] = useState(false);
    const [cardNumber, setCardNumber] = useState('');

    const handleRadioChange = (event) => {
        setPayWithCard(event.target.value === 'yes');
        setCardNumber('');
    };

    const handleCardInputChange = (event) => {
        setCardNumber(event.target.value);
    };

    useEffect(() => {
        const fetchReservationData = async () => {
            try {
                const userObjectInfo = await fetchUserById(reservationUserID);
                const reservationObjectInfo = await fetchUserReservationById(reservationUserID, reservationID);
                if (userObjectInfo && reservationObjectInfo) {

                    setReservationObject(reservationObjectInfo)
                    setUserObject(userObjectInfo)
                }

            } catch (error) {
                console.error('Error fetching agreement data', error);
                alert('Error fetching agreement data');
            }
        };
        fetchReservationData();
    }, [reservationUserID, reservationID]);

    const userId = localStorage.getItem("userId");

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


    const handleSubmitCheckOut = async () => {

        alert("hi")
    }


    return (
        <div className="myProfile">
            <form onSubmit={handleSubmitCheckOut}>
                <div>
                    <h1>Checking out the following vehicle: </h1>
                </div>
                <div>
                    <h2>{reservationObject?.car?.name} rented by {userObject?.name} on {reservationObject?.pickupDate},
                        to be returned by {reservationObject?.dropDate} latest:</h2>
                </div>
                <div>
                    <h2><u>Please check the following before checking out the vehicle</u></h2>
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
                        User returned the vehicle by {reservationObject.dropDate}
                    </label>
                </div>
                <div>
                    <label className="checkbox-label">
                        <input type="checkbox" className="checkbox-input" required/>
                        User returned the vehicle with a full tank or per discussed prior
                    </label>
                </div>
                <div>
                    <label className="checkbox-label">
                        <input type="checkbox" className="checkbox-input" required/>
                        Agent inspected the vehicle for any damages, and reported any damages found.
                    </label>
                </div>
                <div className="inputBoxReserve date-picker-group">
                    <h3 className="checkbox-label">Any reported damages to this vehicle: </h3>

                </div>
                <div>
                     <textarea
                         className="checkInEntryField"
                         name="checkOutCarDamages"
                         value="{checkOutCarDamages}"
                         // onChange={(e) => setCheckOutCarDamages(e.target.value)}
                         placeholder="Enter your text here..."
                     ></textarea>
                </div>
                <div>
                    <div>
                        <label>User wishes to pay with card ****{reservationObject?.cardNum?.slice(-4)}
                            <input
                                type="radio"
                                name="payWithCard"
                                value="yes"
                                checked={payWithCard}
                                onChange={handleRadioChange}
                            />
                            Yes
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="payWithCard"
                                value="no"
                                checked={!payWithCard}
                                onChange={handleRadioChange}
                            />
                            No
                        </label>
                    </div>

                    {!payWithCard && (
                        <div>
                            <input
                                type="text"
                                placeholder="Enter new card number"
                                value={cardNumber}
                                onChange={handleCardInputChange}
                            />
                        </div>
                    )}
                </div>
                <button type="submit" className="proceedToPayement">proceed to payment</button>
            </form>


        </div>
    );
}

export default CheckOut;