package com.bala2sm.springbootbala2sm;
import com.bala2sm.springbootbala2sm.Car;
import com.bala2sm.springbootbala2sm.CarRepository;
import com.bala2sm.springbootbala2sm.CarService;
import org.bson.types.ObjectId;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
public class CarServiceTest {

    @Mock
    private CarRepository carRepository;

    @InjectMocks
    private CarService carService;
    private Car createBasicCar() {
        ObjectId id = new ObjectId();
        String name = "Test Car";
        Double price = 20000.00;
        String info = "A standard test car";
        String imageUrl = "http://example.com/car.jpg";
        boolean available = true;
        ArrayList<String> damages = new ArrayList<>();

        Car car = new Car();
        car.setId(id);
        car.setName(name);
        car.setPrice(price);
        car.setInfo(info);
        car.setImageUrl(imageUrl);
        car.setAvailable(available);
        car.setDamages(damages);

        return car;
    }

    private Car createAvailableCar() {
        Car car = createBasicCar();
        car.setAvailable(true);
        return car;
    }

    private Car createUnavailableCar() {
        Car car = createBasicCar();
        car.setAvailable(false);
        return car;
    }
    @Test
    public void testGetAvailableCars() {
        List<Car> cars = Arrays.asList(createAvailableCar(), createUnavailableCar());
        when(carRepository.findAll()).thenReturn(cars);

        List<Car> result = carService.getAvailableCars();

        assertEquals(1, result.size());
        assertTrue(result.get(0).isAvailable());
    }
    @Test
    public void testGetAllCars() {
        List<Car> cars = Arrays.asList(createBasicCar(), createBasicCar());
        when(carRepository.findAll()).thenReturn(cars);

        List<Car> result = carService.getAllCars();

        assertEquals(2, result.size());
    }
    @Test
    public void testAddCar() {
        Car car = createBasicCar();
        when(carRepository.save(any(Car.class))).thenReturn(car);

        Car result = carService.addCar(car);

        assertNotNull(result);
        assertEquals(car.getName(), result.getName());
    }
    @Test
    public void testGetCarById() {
        ObjectId id = new ObjectId();
        Car car = new Car();
        when(carRepository.findById(id)).thenReturn(Optional.of(car));

        Optional<Car> result = carService.getCarById(id);

        assertTrue(result.isPresent());
        assertEquals(car, result.get());
    }
    @Test
    public void testGetCarByIdFound() {
        ObjectId id = new ObjectId();
        Car car = createBasicCar();
        when(carRepository.findById(id)).thenReturn(Optional.of(car));

        Optional<Car> result = carService.getCarById(id);

        assertTrue(result.isPresent());
        assertEquals(car.getId(), result.get().getId());
    }

    @Test
    public void testGetCarByIdNotFound() {
        ObjectId id = new ObjectId();
        when(carRepository.findById(id)).thenReturn(Optional.empty());

        Optional<Car> result = carService.getCarById(id);

        assertFalse(result.isPresent());
    }
    @Test
    public void testUpdateCar() {
        ObjectId id = new ObjectId();
        Car existingCar = createBasicCar();
        Car updatedCar = createBasicCar();
        updatedCar.setName("Updated Car Name");

        when(carRepository.findById(id)).thenReturn(Optional.of(existingCar));
        when(carRepository.save(any(Car.class))).thenReturn(updatedCar);

        Car result = carService.updateCar(id, updatedCar);

        assertNotNull(result);
        assertEquals("Updated Car Name", result.getName());
    }
    @Test
    public void testDeleteCar() {
        ObjectId id = new ObjectId();
        doNothing().when(carRepository).deleteById(id);

        carService.deleteCar(id);

        verify(carRepository, times(1)).deleteById(id);
    }

    @Test
    public void testGetCarsByName() {
        List<Car> expectedCars = Arrays.asList(createBasicCar(), createBasicCar());
        when(carRepository.findByName("Test Car")).thenReturn(expectedCars);

        List<Car> result = carService.getCarsByName("Test Car");

        assertNotNull(result);
        assertEquals(2, result.size());
        assertEquals("Test Car", result.get(0).getName());
        verify(carRepository, times(1)).findByName("Test Car");
    }

    @Test
    public void testGetCarsByYear() {
        Car car = createBasicCar();
        car.setYear(2020);
        List<Car> expectedCars = Arrays.asList(car);
        when(carRepository.findByYear(2020)).thenReturn(expectedCars);

        List<Car> result = carService.getCarsByYear(2020);

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(2020, result.get(0).getYear());
        verify(carRepository, times(1)).findByYear(2020);
    }

    @Test
    public void testGetCarsByType() {
        Car car = createBasicCar();
        car.setType("SUV");
        List<Car> expectedCars = Arrays.asList(car);
        when(carRepository.findByType("SUV")).thenReturn(expectedCars);

        List<Car> result = carService.getCarsByType("SUV");

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("SUV", result.get(0).getType());
        verify(carRepository, times(1)).findByType("SUV");
    }

    @Test
    public void testGetCarsByColor() {
        Car car = createBasicCar();
        car.setColor("Red");
        List<Car> expectedCars = Arrays.asList(car);
        when(carRepository.findByColor("Red")).thenReturn(expectedCars);

        List<Car> result = carService.getCarsByColor("Red");

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("Red", result.get(0).getColor());
        verify(carRepository, times(1)).findByColor("Red");
    }

    @Test
    public void testGetCarsByPriceRange() {
        Car car = createBasicCar();
        car.setPrice(15000.00);
        List<Car> expectedCars = Arrays.asList(car);
        when(carRepository.findByPriceBetween(10000.00, 20000.00)).thenReturn(expectedCars);

        List<Car> result = carService.getCarsByPriceRange(10000.00, 20000.00);

        assertNotNull(result);
        assertEquals(1, result.size());
        assertTrue(result.get(0).getPrice() >= 10000.00 && result.get(0).getPrice() <= 20000.00);
        verify(carRepository, times(1)).findByPriceBetween(10000.00, 20000.00);
    }
    @Test
    public void testGetCarsByBranchId() {
        ObjectId branchId = new ObjectId();
        List<Car> expectedCars = Arrays.asList(new Car(), new Car());
        when(carRepository.findByBranch_Id(branchId)).thenReturn(expectedCars);

        List<Car> result = carService.getCarsByBranchId(branchId);

        assertNotNull(result);
        assertEquals(2, result.size());
        verify(carRepository, times(1)).findByBranch_Id(branchId);
    }


}
