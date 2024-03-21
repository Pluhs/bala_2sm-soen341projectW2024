import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RentalAgreement.css';

const RentalAgreement = ({ userId, reservationId }) => {
    const [agreementDetails, setAgreementDetails] = useState({});
    const [renterSignature, setRenterSignature] = useState('');
    const [renterPrintName, setRenterPrintName] = useState('');
    const [dateSigned, setDateSigned] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        const fetchAgreementData = async () => {
            try {
                const userResponse = await axios.get(`http://localhost:3000/users/${userId}`);
                const reservationResponse = await axios.get(`http://localhost:3000/users/${userId}/reservations/${reservationId}`);

                setAgreementDetails({
                    ...userResponse.data,
                    ...reservationResponse.data,
                    // Assume these are the right paths to the data you need
                    name: userResponse.data.name,
                    address: userResponse.data.address,
                    contactNumber: userResponse.data.phoneNumber,
                    emailAddress: userResponse.data.email,
                    driverLicenseNumber: userResponse.data.driverLicense,
                    make: reservationResponse.data.car.name,
                    model: reservationResponse.data.car.model,
                    year: reservationResponse.data.car.year,
                    licensePlateNumber: reservationResponse.data.car.plateNum,
                    vin: reservationResponse.data.car.vin,
                    color: reservationResponse.data.car.color,
                    rentalStartDate: reservationResponse.data.pickupDate,
                    rentalEndDate: reservationResponse.data.dropDate,
                    pickupLocation: reservationResponse.data.car.branch.address,
                    dropoffLocation: reservationResponse.data.car.branch.address,
                    rentalPeriod: reservationResponse.data.rentalPeriod, // calculate this as needed
                    mileageLimit: reservationResponse.data.car.milage,
                    rentalRate: reservationResponse.data.car.price,
                    additionalServices: `Cleaning: $${reservationResponse.data.cleaningPrice}, Insurance: $${reservationResponse.data.insurancePrice}`,
                });
            } catch (error) {
                console.error('Error fetching agreement data', error);
            }
        };

        fetchAgreementData();
    }, [userId, reservationId]);

    useEffect(() => {
        setIsFormValid(
            renterSignature.trim() !== '' &&
            renterPrintName.trim() !== '' &&
            dateSigned.trim() !== ''
        );
    }, [renterSignature, renterPrintName, dateSigned]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (isFormValid) {
            const payload = {
                ...agreementDetails,
                renterSignature,
                renterPrintName,
                dateSigned,
            };

            try {
                await axios.post('http://localhost:3000/users/mailContract', payload);
            } catch (error) {
                console.error('Error submitting agreement', error);
            }
        }
    };

    // Form to display and sign the agreement
    return (
        <div className="rental-agreement-container">
            <form onSubmit={handleSubmit} className="rental-agreement-form">
                <h1 className="agreement-title">Rental Agreement</h1>

                <section className="renter-info">
                    <h2 className="section-title">Renter's Information:</h2>
                    <p className="renter-detail">Name: {agreementDetails.name}</p>
                    <p className="renter-detail">Address: {agreementDetails.address}</p>
                    <p className="renter-detail">Contact Number: {agreementDetails.contactNumber}</p>
                    <p className="renter-detail">Email Address: {agreementDetails.emailAddress}</p>
                    <p className="renter-detail">Driver's License Number: {agreementDetails.driverLicenseNumber}</p>
                </section>

                <section className="vehicle-info">
                    <h2 className="section-title">Vehicle Information:</h2>
                    <p className="vehicle-detail">Make: {agreementDetails.make}</p>
                    <p className="vehicle-detail">Model: {agreementDetails.model}</p>
                    <p className="vehicle-detail">Year: {agreementDetails.year}</p>
                    <p className="vehicle-detail">License Plate Number: {agreementDetails.licensePlateNumber}</p>
                    <p className="vehicle-detail">Vehicle Identification Number (VIN): {agreementDetails.vin}</p>
                    <p className="vehicle-detail">Color: {agreementDetails.color}</p>
                </section>

                <section className="rental-details">
                    <h2 className="section-title">Rental Details:</h2>
                    <p className="rental-detail">Rental Start Date: {agreementDetails.rentalStartDate}</p>
                    <p className="rental-detail">Rental End Date: {agreementDetails.rentalEndDate}</p>
                    <p className="rental-detail">Pick-up Location: {agreementDetails.pickupLocation}</p>
                    <p className="rental-detail">Drop-off Location: {agreementDetails.dropoffLocation}</p>
                    <p className="rental-detail">Rental Period: {agreementDetails.rentalPeriod}</p>
                    <p className="rental-detail">Mileage Limit (if applicable): {agreementDetails.mileageLimit}</p>
                    <p className="rental-detail">Rental Rate: {agreementDetails.rentalRate}</p>
                    <p className="rental-detail">Additional Services (if any): {agreementDetails.additionalServices}</p>
                </section>

                <section className="signature-section">
                    <div className="input-group">
                        <label className="input-label">
                            Renter's Signature:
                            <input
                                className="input-field signature-input"
                                type="text"
                                value={renterSignature}
                                onChange={(e) => setRenterSignature(e.target.value)}
                                required
                            />
                        </label>
                    </div>
                    <div className="input-group">
                        <label className="input-label">
                            Print Name:
                            <input
                                className="input-field print-name-input"
                                type="text"
                                value={renterPrintName}
                                onChange={(e) => setRenterPrintName(e.target.value)}
                                required
                            />
                        </label>
                    </div>
                    <div className="input-group">
                        <label className="input-label">
                            Date:
                            <input
                                className="input-field date-input"
                                type="date"
                                value={dateSigned}
                                onChange={(e) => setDateSigned(e.target.value)}
                                required
                            />
                        </label>
                    </div>
                </section>

                <div className="form-actions">
                    <button type="submit" disabled={!isFormValid} className="submit-button">
                        Agree and Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default RentalAgreement;
