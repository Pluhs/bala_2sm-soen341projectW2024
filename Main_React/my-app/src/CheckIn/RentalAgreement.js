import React, { useState, useEffect } from 'react';
import './RentalAgreement.css';
import {fetchUserById,fetchUserReservationById} from '../LogInForm/UserInfo'

const RentalAgreement = ({ userId, reservationId }) => {
    const [agreementDetails, setAgreementDetails] = useState({});
    const [renterSignature, setRenterSignature] = useState('');
    const [renterPrintName, setRenterPrintName] = useState('');
    const [dateSigned, setDateSigned] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);


    useEffect(() => {
        const fetchAgreementData = async () => {
            try {
                const userResponse = await fetchUserById("65efa3b20d643e473880aeb5");
                const reservationResponse = await fetchUserReservationById("65efa3b20d643e473880aeb5", "65fb42dbfc189f5551e25ad0");
                if (userResponse && reservationResponse) {
                    const rentalStartDate = new Date(reservationResponse.pickupDate);
                    const rentalEndDate = new Date(reservationResponse.dropDate);
                    const differenceInMilliseconds = rentalEndDate - rentalStartDate;
                    const period = differenceInMilliseconds / (1000 * 3600 * 24);

                    setAgreementDetails({
                        ...userResponse.data,
                        ...reservationResponse.data,
                        name: userResponse.name,
                        address: reservationResponse.userAddress,
                        contactNumber: reservationResponse.phoneNumber,
                        emailAddress: userResponse.email,
                        driverLicenseNumber: reservationResponse.driverLicense,
                        make: reservationResponse.car.name,
                        model: reservationResponse.car.model,
                        year: reservationResponse.car.year,
                        licensePlateNumber: reservationResponse.car.plateNum,
                        vin: reservationResponse.car.vin,
                        color: reservationResponse.car.color,
                        rentalStartDate: rentalStartDate.toISOString().split('T')[0],
                        rentalEndDate: rentalEndDate.toISOString().split('T')[0],
                        pickupLocation: reservationResponse.car.branch.address,
                        dropoffLocation: reservationResponse.car.branch.address,
                        period:period,
                        mileageLimit: reservationResponse.car.milage * period,
                        rentalRate: reservationResponse.car.price * period,
                        additionalCleaning: reservationResponse.cleaning?`Cleaning: $35` : "Cleaning not included" ,
                        additionalInsurance: reservationResponse.insurance? `Insurance: $70` : "Insurance not included",
                    });
                }
            } catch (error) {
                console.error('Error fetching agreement data', error);
                alert('Error fetching agreement data');
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

    }


    return (
        <div className="rental-agreement-container">
            <form onSubmit={handleSubmit} className="rental-agreement-form">
                <h1 className="agreement-title">Rental Agreement</h1>
                <h2 className="section-title">Rental Agreement Number: {reservationId}</h2>
                <p className="renter-detail">This Rental Agreement ("Agreement") is entered into between Royal Car Rental, located at {agreementDetails.pickupLocation}, hereinafter referred to as the "Rental Company," and the
                    individual or entity identified below, hereinafter referred to as the "Renter":</p>
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
                    <p className="rental-detail">Rental Period: {agreementDetails.period}</p>
                    <p className="rental-detail">Mileage Limit (if applicable): {agreementDetails.mileageLimit}</p>
                    <p className="rental-detail">Rental Rate: {agreementDetails.rentalRate}</p>
                    <p className="rental-detail">Additional Services (if
                        any): {agreementDetails.additionalCleaning}, {agreementDetails.additionalInsurance}</p>
                </section>
                <section className="rental-details">
                    <h2 className="section-title">Rental Terms and Conditions:</h2>
                    <p className="rental-detail">The Renter acknowledges receiving the vehicle described above in good
                        condition and agrees to return it to the Rental Company in the same condition, subject to normal
                        wear and tear.
                        The Renter agrees to use the vehicle solely for personal or business purposes and not for any
                        illegal activities.
                    </p>
                    <p className="rental-detail">The Renter agrees to pay the Rental Company the agreed-upon rental rate
                        for the specified rental period. Additional charges may apply for exceeding the mileage limit,
                        late returns, fuel refueling, or other damages.</p>
                    <p className="rental-detail">The Renter agrees to bear all costs associated with traffic violations,
                        tolls, and parking fines incurred during the rental period.</p>
                    <p className="rental-detail">The Renter acknowledges that they are responsible for any loss or
                        damage to the vehicle, including theft, vandalism, accidents, or negligence, and agrees to
                        reimburse the Rental Company for all repair or replacement costs.</p>
                    <p className="rental-detail">The Renter agrees to return the vehicle to the designated drop-off
                        location at the agreed-upon date and time. Failure to do so may result in additional
                        charges.</p>
                    <p className="rental-detail">The Rental Company reserves the right to terminate this agreement and
                        repossess the vehicle without prior notice if the Renter breaches any terms or conditions of
                        this agreement.</p>
                    <p className="rental-detail">The Renter acknowledges receiving and reviewing a copy of the vehicle's
                        insurance coverage and agrees to comply with all insurance requirements during the rental
                        period.</p>
                </section>
                <section className="rental-details">
                    <h2 className="section-title">Indemnification:</h2>
                    <p className="rental-detail">The Renter agrees to indemnify and hold harmless the Rental Company,
                        its employees, agents, and affiliates from any claims, liabilities, damages, or expenses arising
                        out of or related to the Renter's use of the vehicle.</p>
                </section>
                <section className="rental-details">
                    <h2 className="section-title">Governing Law:</h2>
                    <p className="rental-detail">This Agreement shall be governed by and construed in accordance with
                        the laws of [Jurisdiction]. Any disputes arising under or related to this Agreement shall be
                        resolved exclusively by the courts of [Jurisdiction].</p>
                </section>
                <section className="rental-details">
                    <h2 className="section-title">Entire Agreement:</h2>
                    <p className="rental-detail">This Agreement constitutes the entire understanding between the parties
                        concerning the subject matter hereof and supersedes all prior agreements and understandings,
                        whether written or oral.
                    </p>
                </section>
                <section className="signature-section">
                    <h2 className="section-title">Signatures:</h2>
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
