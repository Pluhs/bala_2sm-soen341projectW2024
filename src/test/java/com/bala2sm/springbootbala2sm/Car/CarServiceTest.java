package com.bala2sm.springbootbala2sm.Car;
import com.bala2sm.springbootbala2sm.Car;
import com.bala2sm.springbootbala2sm.CarRepository;
import com.bala2sm.springbootbala2sm.CarService;
import org.bson.types.ObjectId;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
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

        Car car = new Car(id, name, price, info, imageUrl);
        car.setAvailable(available);
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

}
