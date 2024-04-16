package com.bala2sm.springbootbala2sm.Reservation;

import com.bala2sm.springbootbala2sm.Car.Car;
import org.bson.types.ObjectId;
import org.junit.jupiter.api.Test;
import java.time.LocalDate;
import static org.junit.jupiter.api.Assertions.*;

class ReservationTest {

    @Test
    void testReservationConstructorAndGetters() {
        ObjectId id = new ObjectId();
        LocalDate pickupDate = LocalDate.of(2024, 4, 1);
        LocalDate dropDate = LocalDate.of(2024, 4, 10);
        Car car = new Car(); // Assuming a basic constructor or mocked instance
        String userAddress = "123 Main St";
        String phoneNumber = "5551234567";
        String driverLicense = "D12345678";
        boolean insurance = true;
        boolean cleaning = true;
        boolean pickedUp = false;
        boolean returned = false;
        String cardNum = "4111111111111111";

        Reservation reservation = new Reservation(id, pickupDate, dropDate, car, userAddress, phoneNumber, driverLicense,
                insurance, cleaning, pickedUp, returned, cardNum);

        assertEquals(id, reservation.getId());
        assertEquals(pickupDate, reservation.getPickupDate());
        assertEquals(dropDate, reservation.getDropDate());
        assertEquals(car, reservation.getCar());
        assertEquals(userAddress, reservation.getUserAddress());
        assertEquals(phoneNumber, reservation.getPhoneNumber());
        assertEquals(driverLicense, reservation.getDriverLicense());
        assertEquals(insurance, reservation.insurance());
        assertEquals(cleaning, reservation.cleaning());
        assertEquals(pickedUp, reservation.pickedUp());
        assertEquals(returned, reservation.returned());
        assertEquals(cardNum, reservation.getCardNum());
    }

    @Test
    void testSetters() {
        Reservation reservation = new Reservation();
        ObjectId id = new ObjectId();
        LocalDate pickupDate = LocalDate.now();
        LocalDate dropDate = LocalDate.now().plusDays(5);

        reservation.setId(id);
        reservation.setPickupDate(pickupDate);
        reservation.setDropDate(dropDate);
        reservation.setCar(new Car()); // Set a new car
        reservation.setUserAddress("456 Elm St");
        reservation.setPhoneNumber("5559876543");
        reservation.setDriverLicense("D87654321");
        reservation.setInsurance(true);
        reservation.setCleaning(true);
        reservation.setPickedUp(true);
        reservation.setReturned(true);
        reservation.setInsurancePrice(100.0);
        reservation.setCleaningPrice(50.0);
        reservation.setCardNum("5555444433331111");

        assertEquals(id, reservation.getId());
        assertEquals(pickupDate, reservation.getPickupDate());
        assertEquals(dropDate, reservation.getDropDate());
        assertTrue(reservation.insurance());
        assertTrue(reservation.cleaning());
        assertTrue(reservation.pickedUp());
        assertTrue(reservation.returned());
        assertEquals(100.0, reservation.getInsurancePrice());
        assertEquals(50.0, reservation.getCleaningPrice());
        assertEquals("5555444433331111", reservation.getCardNum());
    }
}