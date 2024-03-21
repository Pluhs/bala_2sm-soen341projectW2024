import React, { useState } from 'react';
import './RentalAgreement.css';

function RentalAgreement() {
    return (
        <div className="rentalAgreement">
            <h1>Car Rental Agreement</h1>
            <form className="rentalForm">
                <label>Rental Agreement Number:</label>
                <input type="text" placeholder="[Unique Rental Agreement Number]" />
                <h2>1. Renter's Information:</h2>
                <label>Name:</label>
                <input type="text" placeholder="Full Name" />
                <h2>2. Vehicle Information:</h2>
                <label>Make:</label>
                <input type="text" placeholder="Car Make" />
                <h2>3. Rental Details:</h2>
                <label>Rental Start Date:</label>
                <input type="date" />
                <h2>4. Rental Terms and Conditions:</h2>
                <textarea rows="5">
          The Renter acknowledges receiving the vehicle...
        </textarea>
                <h2>8. Signatures:</h2>
                <label>Rental Company Signature:</label>
                <input type="text" placeholder="Signature" />
                <label>Renter Signature:</label>
                <input type="text" placeholder="Signature" />
                <button type="submit">Submit Agreement</button>
            </form>
        </div>
    );
}

export default RentalAgreement;
