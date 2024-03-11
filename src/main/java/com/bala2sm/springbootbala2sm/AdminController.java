package com.bala2sm.springbootbala2sm;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {

    @Autowired
    private UserService userService;

    @Autowired
    private CarService carService;

    @PostMapping("/users")
    public ResponseEntity<?> createUser(@RequestBody User user) {
        try {
            User newUser = userService.createUser(user);
            return ResponseEntity.ok(newUser);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    @GetMapping("/users")
    public List<User> getallUsers() {
        return userService.getAllUsers();
    }


    @GetMapping("/users/{id}")
    public ResponseEntity<?> getUser(@PathVariable ObjectId id) {
        Optional<User> user = userService.getUserById(id);
        if (user.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(user.get());
    }


    @PutMapping("/users/{id}")
    public ResponseEntity<?> updateUser(@PathVariable ObjectId id, @RequestBody User user) {
        User updatedUser = null;
        try {
            updatedUser = userService.updateUser(id, user);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
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

    // Car management

    @GetMapping("/cars")
    public List<Car> getAllCars() {
        return carService.getAllCars();
    }

    @PostMapping("/cars")
    public ResponseEntity<?> createCar(@RequestBody Car car) {
        Car newCar = carService.addCar(car);
        return ResponseEntity.ok(newCar);
    }

    @GetMapping("/cars/{id}")
    public ResponseEntity<?> getCar(@PathVariable ObjectId id) {
        Car car = carService.getCarById(id).orElse(null);
        if (car == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(car);
    }

    @PutMapping("/cars/{id}")
    public ResponseEntity<?> updateCar(@PathVariable ObjectId id, @RequestBody Car car) {
        Car updatedCar = carService.updateCar(id, car);
        return ResponseEntity.ok(updatedCar);
    }

    @DeleteMapping("/cars/{id}")
    public ResponseEntity<?> deleteCar(@PathVariable ObjectId id) {
        carService.deleteCar(id);
        return ResponseEntity.ok().build();
    }

    // Reservation management
//
//    @GetMapping("/reservations")
//    public List<Reservation> getAllReservations() {
//        return reservationService.getAllReservations();
//    }
//
//    @PostMapping("/reservations")
//    public ResponseEntity<?> createReservation(@RequestBody Reservation reservation) {
//        Reservation newReservation = reservationService.createReservation(reservation);
//        return ResponseEntity.ok(newReservation);
//    }
//
//    @GetMapping("/reservations/{id}")
//    public ResponseEntity<?> getReservation(@PathVariable ObjectId id) {
//        Reservation reservation = reservationService.getReservationById(id).orElse(null);
//        if (reservation == null) {
//            return ResponseEntity.notFound().build();
//        }
//        return ResponseEntity.ok(reservation);
//    }
//
//    @PutMapping("/reservations/{id}")
//    public ResponseEntity<?> updateReservation(@PathVariable ObjectId id, @RequestBody Reservation reservation) {
//        Reservation updatedReservation = reservationService.updateReservation(id, reservation);
//        return ResponseEntity.ok(updatedReservation);
//    }
//
//    @DeleteMapping("/reservations/{id}")
//    public ResponseEntity<?> deleteReservation(@PathVariable ObjectId id) {
//        reservationService.deleteReservation(id);
//        return ResponseEntity.ok().build();
//    }
}