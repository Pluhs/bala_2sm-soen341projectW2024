package com.bala2sm.springbootbala2sm.Car;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/cars")
@CrossOrigin(origins = "http://localhost:3000")
public class CarController {

    @Autowired
    private CarService carService;

    @GetMapping("/available")
    public ResponseEntity<List<Car>> getAvailableCars() {
        List<Car> availableVehicles = carService.getAvailableCars();
        return ResponseEntity.ok(availableVehicles);
    }

    @GetMapping
    public ResponseEntity<List<Car>> getAllCars() {
        List<Car> allCars = carService.getAllCars();
        return ResponseEntity.ok(allCars);
    }

    @PostMapping
    public ResponseEntity<Car> addCar(@RequestBody Car car) {
        Car newCar = carService.addCar(car);
        return ResponseEntity.ok(newCar);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Car> getCarById(@PathVariable ObjectId id) {
        return carService.getCarById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
    @PutMapping("/{id}")
    public ResponseEntity<Car> updateCar(@PathVariable ObjectId id, @RequestBody Car car) {
        Car updatedCar = carService.updateCar(id, car);
        return ResponseEntity.ok(updatedCar);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCar(@PathVariable ObjectId id) {
        carService.deleteCar(id);
        return ResponseEntity.ok().build();
    }
    @PutMapping("/{id}/inspect")
    public ResponseEntity<Car> inspectCar(@PathVariable ObjectId id, @RequestBody ArrayList<String> damages) {
        return carService.inspectCar(id, damages)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/name/{name}")
    public ResponseEntity<List<Car>> getCarsByName(@PathVariable String name) {
        List<Car> cars = carService.getCarsByName(name);
        return ResponseEntity.ok(cars);
    }

    @GetMapping("/year/{year}")
    public ResponseEntity<List<Car>> getCarsByYear(@PathVariable int year) {
        List<Car> cars = carService.getCarsByYear(year);
        return ResponseEntity.ok(cars);
    }

    @GetMapping("/type/{type}")
    public ResponseEntity<List<Car>> getCarsByType(@PathVariable String type) {
        List<Car> cars = carService.getCarsByType(type);
        return ResponseEntity.ok(cars);
    }

    @GetMapping("/color/{color}")
    public ResponseEntity<List<Car>> getCarsByColor(@PathVariable String color) {
        List<Car> cars = carService.getCarsByColor(color);
        return ResponseEntity.ok(cars);
    }

    @GetMapping("/price")
    public ResponseEntity<List<Car>> getCarsByPriceRange(@RequestParam Double minPrice, @RequestParam Double maxPrice) {
        List<Car> cars = carService.getCarsByPriceRange(minPrice, maxPrice);
        return ResponseEntity.ok(cars);
    }
    @GetMapping("/branch/{branchId}")
    public ResponseEntity<List<Car>> getCarsByBranchId(@PathVariable String branchId) {
        try {
            ObjectId id = new ObjectId(branchId);
            List<Car> cars = carService.getCarsByBranchId(id);
            return ResponseEntity.ok(cars);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

}
