package com.bala2sm.springbootbala2sm;

import com.bala2sm.springbootbala2sm.Car;
import org.bson.types.ObjectId;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.*;

class CarTest {

    @Test
    void testCar() {
        ObjectId id = new ObjectId();
        Car car = new Car();
        car.setId(id);
        car.setName("Test Car");
        car.setPrice(100.0);
        car.setInfo("Info");
        car.setImageUrl("url");
        ArrayList<String> damages = new ArrayList<>(Arrays.asList("Scratch on door", "Broken mirror"));
        car.setDamages(damages);

        assertEquals(id, car.getId(), "ID should match");
        assertEquals("Test Car", car.getName(), "Name should match");
        assertEquals(100.0, car.getPrice(), "Price should match");
        assertEquals("Info", car.getInfo(), "Info should match");
        assertEquals("url", car.getImageUrl(), "Image URL should match");
        assertEquals(damages, car.getDamages(), "Damages should match");
    }

    @Test
    void testCarPriceValidation() {
        Car car = new Car();
        car.setPrice(-1.0);
        assertNotEquals(-1.0, car.getPrice());
    }
    @Test
    void testDamages() {
        Car car = new Car();
        ArrayList<String> damages = new ArrayList<>(Arrays.asList("Scratch on door", "Broken mirror"));
        car.setDamages(damages);

        assertEquals(damages, car.getDamages(), "Damages should match the set value");
    }
}