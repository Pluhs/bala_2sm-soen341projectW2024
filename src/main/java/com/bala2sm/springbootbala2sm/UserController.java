package com.bala2sm.springbootbala2sm;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private CarService carService;
    @Autowired
    private ReservationRepository reservationRepository;

    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {

            User newUser = userService.createUser(user);
            if(newUser != null){
                return new ResponseEntity<>(newUser, HttpStatus.CREATED);
            }
            return new ResponseEntity<>(null, HttpStatus.CONFLICT);

    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUserProfile(@PathVariable ObjectId id) {
        return userService.getUserById(id)
                .map(user -> ResponseEntity.ok().body(user))
                .orElse(ResponseEntity.notFound().build());
    }

    // Endpoint to update user profile
    @PutMapping("/{id}")
    public ResponseEntity<?> updateUserProfile(@PathVariable ObjectId id, @RequestBody User user) {
        try {
            User updatedUser = userService.updateUser(id, user);
            return ResponseEntity.ok(updatedUser);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Endpoint to delete user profile
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUserProfile(@PathVariable ObjectId id) {
        userService.deleteUser(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/sign-in")
    public ResponseEntity<User> signIn(@RequestParam String email, @RequestParam String password) {
        if (userService.signIn(email,password) != null){
            return ResponseEntity.ok().build();
        }
        else
            return new ResponseEntity<>(null, HttpStatus.FORBIDDEN);
    }

    @PostMapping("/{userId}/reservations")
    public ResponseEntity<?> addReservation(@PathVariable ObjectId userId, @RequestBody Reservation reservation) {
        try {
            if (userId == null || reservation.getCar().getId() == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid or null ID provided");
            }
            Car car = carService.getCarById(reservation.getCar().getId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Car not found"));

            List<Reservation> overlappingReservations = reservationRepository.findByCarAndPickupDateLessThanEqualAndDropDateGreaterThanEqual(
                    car.getId(), reservation.getPickupDate(), reservation.getDropDate());

            if (!overlappingReservations.isEmpty()) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Car is already reserved for the selected dates");
            }
            User updatedUser = userService.addReservation(userId, reservation);
            return ResponseEntity.ok(updatedUser);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }


    @DeleteMapping("/{id}/reservations/{reservationId}")
    public ResponseEntity<?> deleteReservation(@PathVariable ObjectId id, @PathVariable ObjectId reservationId) {
        try {

            User updatedUser = userService.deleteReservation(id, reservationId);
            return ResponseEntity.ok(updatedUser);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @PutMapping("/{id}/reservations/{reservationId}")
    public ResponseEntity<?> updateReservation(@PathVariable ObjectId id, @PathVariable ObjectId reservationId, @RequestBody Reservation reservation) {
        try {
            User updatedUser = userService.updateReservation(id, reservationId, reservation);
            return ResponseEntity.ok(updatedUser);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}