import React, {useEffect, useState} from 'react';
import "./CheckIn.css"
import {Link, useLocation} from "react-router-dom";
import {fetchUserById, fetchUserReservationById} from '../LogInForm/UserInfo'
import {useNavigate} from 'react-router-dom';


const CheckIn = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [userReservations, setUserReservations] = useState([]);
    const [reservationObject, setReservationObject] = useState("");
    const [userObject, setUserObject] = useState("");
    const [textInput, setTextInput] = useState('');
    const [textList, setTextList] = useState([]);
    const location = useLocation();
    const reservationID = location?.state?.id;
    const reservationUserID = location?.state?.userID;

    let navigate = useNavigate()


    useEffect(() => {
        const fetchAgreementData = async () => {
            try {
                setIsLoading(true);
                const userObjectInfo = await fetchUserById(reservationUserID);
                const reservationObjectInfo = await fetchUserReservationById(reservationUserID, reservationID);
                if (userObjectInfo && reservationObjectInfo) {
                    setReservationObject(reservationObjectInfo)
                    setUserObject(userObjectInfo)
                }

            } catch (error) {
                console.error('Error fetching agreement data', error);
                alert('Error fetching agreement data');
            } finally {
                setIsLoading(false);
            }
        };
        fetchAgreementData();
    }, [reservationUserID, reservationID]);

    const userId = localStorage.getItem("userId");


    const updateCarDamages = async (carId, damages) => {
        try {
            const response = await fetch(`http://localhost:8080/cars/${carId}/inspect`, {
                method: 'PUT', headers: {
                    'Content-Type': 'application/json',
                }, body: JSON.stringify(damages),
            });
            if (!response.ok) {
                throw new Error('Error updating car damages');
            }
        } catch (error) {
            console.error('Error updating car damages:', error);
            return null;
        }
    };

    const handleGoToSignAgreement = (userId, reservationId) => {

        navigate('/rentalAgreement', {state: {userId: userId, reservationId: reservationId}})
    }


    const handleSubmitToSignAgreement = (event) => {
        event.preventDefault();

        const inputValue = event.target.elements.textarea.value.trim();

        if (inputValue !== '') {
            setTextInput(inputValue);
            const tempList = [inputValue]

            setTextList(tempList);

            updateCarDamages(reservationObject.car.id, tempList)


        }
        handleGoToSignAgreement(reservationUserID, reservationID)


    }
    if (!userId) {
        return (<div className="sorryContainer">
                <img src="/Images/unauthorized.png" className="sorryImg" alt="unauthorized"/>
                <h3 className="sorryMsg">We are Sorry...</h3>
                <p className="sorryText">Access is denied due to the absence of a valid login session.</p>
                <Link to={`/login`}>
                    <button className="sorryBtn">Go Back To Login Page</button>
                </Link>
            </div>);
    }

    if (isLoading) {
        return <div className="centered-container">Loading...</div>;
    }

    return (<div className="myProfile">
            <form onSubmit={handleSubmitToSignAgreement}>
                <div>
                    <h1>Confirmation for the following reservation: </h1>
                </div>
                <div>
                    <h2>{reservationObject?.car?.color} {reservationObject?.car?.name} {reservationObject?.car?.model} {reservationObject?.car?.year},
                        by {userObject?.name}, to be picked up on {reservationObject?.pickupDate}:</h2>
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
                        User presented the same driver's license they used to make the booking
                        ({reservationObject.driverLicense})
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


        </div>);
}

export default CheckIn;