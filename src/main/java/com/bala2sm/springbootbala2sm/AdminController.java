package com.bala2sm.springbootbala2sm;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private UserService userService;

    @Autowired
    private VehicleService vehicleService;

    @Autowired
    private ReservationService reservationService;

    @PostMapping("/users")
    public ResponseEntity<?> createUser(@RequestBody User user) {
        User newUser = userService.createUser(user);
        return ResponseEntity.ok(newUser);
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<?> getUser(@PathVariable ObjectId id) {
        Optional<User> user = userService.getUserById(id);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(user);
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<?> updateUser(@PathVariable ObjectId id, @RequestBody User user) {
        User updatedUser = userService.updateUser(id, user);
        if (updatedUser == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable ObjectId id) {
        userService.deleteUser(id);
        return ResponseEntity.ok().build();
    }

    // Vehicle management
    @PostMapping("/vehicles")
    public ResponseEntity<?> createVehicle(@RequestBody Car car) {
        Car newCar = vehicleService.addVehicle(car);
        return ResponseEntity.ok(newCar);
    }

    @GetMapping("/vehicles/{id}")
    public ResponseEntity<?> getVehicle(@PathVariable ObjectId id) {
        Car car = vehicleService.getVehicleById(id).orElse(null);
        if (car == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(car);
    }

    @PutMapping("/vehicles/{id}")
    public ResponseEntity<?> updateVehicle(@PathVariable ObjectId id, @RequestBody Car car) {
        Car updatedCar = vehicleService.updateVehicle(id, car);
        return ResponseEntity.ok(updatedCar);
    }

    @DeleteMapping("/vehicles/{id}")
    public ResponseEntity<?> deleteVehicle(@PathVariable ObjectId id) {
        vehicleService.deleteVehicle(id);
        return ResponseEntity.ok().build();
    }

    // Reservation management
    @PostMapping("/reservations")
    public ResponseEntity<?> createReservation(@RequestBody Reservation reservation) {
        Reservation newReservation = reservationService.createReservation(reservation);
        return ResponseEntity.ok(newReservation);
    }

    @GetMapping("/reservations/{id}")
    public ResponseEntity<?> getReservation(@PathVariable ObjectId id) {
        Reservation reservation = reservationService.getReservationById(id).orElse(null);
        if (reservation == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(reservation);
    }

    @PutMapping("/reservations/{id}")
    public ResponseEntity<?> updateReservation(@PathVariable ObjectId id, @RequestBody Reservation reservation) {
        Reservation updatedReservation = reservationService.updateReservation(id, reservation);
        return ResponseEntity.ok(updatedReservation);
    }

    @DeleteMapping("/reservations/{id}")
    public ResponseEntity<?> deleteReservation(@PathVariable ObjectId id) {
        reservationService.deleteReservation(id);
        return ResponseEntity.ok().build();
    }
}