package com.bala2sm.springbootbala2sm;

import org.bson.types.ObjectId;
import org.junit.jupiter.api.Test;
import java.time.LocalDate;
import static org.junit.jupiter.api.Assertions.*;

class ReservationTest {

    @Test
    void testReservationGettersAndSetters() {
        ObjectId id = new ObjectId();
        LocalDate pickupDate = LocalDate.now();
        LocalDate dropDate = LocalDate.now().plusDays(1);
        Car car = new Car();
        Reservation reservation = new Reservation();
        reservation.setId(id);
        reservation.setPickupDate(pickupDate);
        reservation.setDropDate(dropDate);
        reservation.setCar(car);

        assertEquals(id, reservation.getId());
        assertEquals(pickupDate, reservation.getPickupDate());
        assertEquals(dropDate, reservation.getDropDate());
        assertEquals(car, reservation.getCar());
    }
}