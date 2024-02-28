package com.bala2sm.springbootbala2sm;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/vehicles")
public class VehicleController {

    @Autowired
    private VehicleService vehicleService;

    @GetMapping("/available")
    public ResponseEntity<List<Car>> getAvailableVehicles() {
        List<Car> availableVehicles = vehicleService.getAvailableVehicles();
        return ResponseEntity.ok(availableVehicles);
    }
    @PostMapping
    public ResponseEntity<Car> addVehicle(@RequestBody Car car) {
        Car newCar = vehicleService.addVehicle(car);
        return ResponseEntity.ok(newCar);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Car> getVehicleById(@PathVariable ObjectId id) {
        return vehicleService.getVehicleById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
    @PutMapping("/{id}")
    public ResponseEntity<Car> updateVehicle(@PathVariable ObjectId id, @RequestBody Car car) {
        Car updatedCar = vehicleService.updateVehicle(id, car);
        return ResponseEntity.ok(updatedCar);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteVehicle(@PathVariable ObjectId id) {
        vehicleService.deleteVehicle(id);
        return ResponseEntity.ok().build();
    }
}
