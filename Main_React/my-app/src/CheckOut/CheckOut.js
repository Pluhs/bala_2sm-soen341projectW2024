import React, {useEffect, useState} from 'react';
import "./CheckOut.css"
import {Link, useLocation} from "react-router-dom";
import {fetchUserById,fetchUserReservationById} from '../LogInForm/UserInfo'
import {useNavigate} from 'react-router-dom';


const CheckOut = () => {
    const [userReservations, setUserReservations] = useState([]);
    const [checkOutReservationObject, setCheckOutReservationObject] = useState("");
    const [checkOutUserObject, setCheckOutUserObject] = useState("");
    const location = useLocation();
    const checkOutReservationID = location?.state?.id;
    const checkOutReservationUserID = location?.state?.userID;


    const [payWithCard, setPayWithCard] = useState(false);
    const [cardNumber, setCardNumber] = useState('');
    const [checkOutCarDamages, setCheckOutCarDamages] = useState('');
    const [damagesList, setDamagesList] = useState([]);
    let navigate = useNavigate()

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
                const checkOutUserObjectInfo = await fetchUserById(checkOutReservationUserID);
                const checkOutReservationObjectInfo = await fetchUserReservationById(checkOutReservationUserID, checkOutReservationID);
                if (checkOutUserObjectInfo && checkOutReservationObjectInfo) {

                    setCheckOutReservationObject(checkOutReservationObjectInfo)
                    setCheckOutUserObject(checkOutUserObjectInfo)
                }

            } catch (error) {
                console.error('Error fetching agreement data', error);
                alert('Error fetching agreement data');
            }
        };
        fetchReservationData();
    }, [checkOutReservationUserID, checkOutReservationID]);

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

    const updateCarDamages = async (carId, damages) => {
        try {
            const response = await fetch(`http://localhost:8080/cars/${carId}/inspect`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(damages),
            });
            if (!response.ok) {
                throw new Error('Error updating car damages');
            }
            // return await response.json(); // Assuming your server responds with the updated reservation data
        } catch (error) {
            console.error('Error updating car damages:', error);
            return null;
        }
    };

    const handleGoToPayment = (userId, reservationId) => {

        navigate('/payment',{state:{userId: userId, reservationId: reservationId} } )
    }

    const handleSubmitCheckOut = (event) => {
        event.preventDefault();

        const checkOutCarDamagesValue = checkOutCarDamages.trim()
        if (checkOutCarDamagesValue !== '') {
            setCheckOutCarDamages(checkOutCarDamagesValue);
            const damagesList = [checkOutCarDamagesValue]

            setDamagesList(damagesList);

            updateCarDamages(checkOutReservationObject.car.id, damagesList)
        }

        if (cardNumber.trim()!== ''){
            alert(cardNumber)
        }
        handleGoToPayment(checkOutReservationUserID,checkOutReservationID)
    }


    return (
        <div className="myProfile">
            <form onSubmit={handleSubmitCheckOut}>
                <div>
                    <h1>Checking out the following vehicle: </h1>
                </div>
                <div>
                    <h2>{checkOutReservationObject?.car?.name} rented by {checkOutUserObject?.name} on {checkOutReservationObject?.pickupDate},
                        to be returned by {checkOutReservationObject?.dropDate} latest:</h2>
                </div>
                <div>
                    <h2><u>Please check the following before checking out the vehicle</u></h2>
                </div>
                <div>
                    <label className="checkbox-label">
                        <input type="checkbox" className="checkbox-input" required/>
                        User presented their valid booking confirmation ({checkOutReservationObject.id})
                    </label>
                </div>

                <div>
                    <label className="checkbox-label">
                        <input type="checkbox" className="checkbox-input" required/>
                        User returned the vehicle by {checkOutReservationObject.dropDate}
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
                         value={checkOutCarDamages}
                         onChange={(e) => setCheckOutCarDamages(e.target.value)}
                         placeholder="Enter car damages here..."
                     ></textarea>
                </div>
                <div>
                    <div>
                        <label>User wishes to pay with card ****{checkOutReservationObject?.cardNum?.slice(-4)}
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
                <button type="submit" className="proceedToPayement">Proceed to Payment</button>
            </form>


        </div>
    );
}

export default CheckOut;