package com.bala2sm.springbootbala2sm;

import org.bson.types.ObjectId;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class CarTest {

    @Test
    void testCarGettersAndSetters() {
        ObjectId id = new ObjectId();
        Car car = new Car();
        car.setId(id);
        car.setName("Test Car");
        car.setPrice(100.0);
        car.setInfo("Info");
        car.setImageUrl("url");
        car.setAvailable(true);

        assertEquals(id, car.getId());
        assertEquals("Test Car", car.getName());
        assertEquals(100.0, car.getPrice());
        assertEquals("Info", car.getInfo());
        assertEquals("url", car.getImageUrl());
        assertTrue(car.isAvailable());
    }

    @Test
    void testCarPriceValidation() {
        Car car = new Car();
        car.setPrice(-1.0);
        assertNotEquals(-1.0, car.getPrice());
    }
}