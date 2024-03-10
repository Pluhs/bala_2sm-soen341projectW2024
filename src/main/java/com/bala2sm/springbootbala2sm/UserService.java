package com.bala2sm.springbootbala2sm;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ReservationRepository reservationRepository;
    @Autowired

    CarService carService = new CarService();

    public User createUser(User user) {

        System.out.print(userRepository.findByEmail(user.getEmail()));
            if(userRepository.findByEmail(user.getEmail()) != null) {
                return null;
            }
            user.setRole(Role.USER);
            user.setPassword(SecurityConfiguration.hashPassword(user.getPassword()));
            return userRepository.save(user);

    }

    public User signIn(String email, String password) {
        User user = userRepository.findByEmail(email);
        String hashedPassword;

            hashedPassword = SecurityConfiguration.hashPassword(password);

        if (user != null && user.getPassword().equals(hashedPassword)) {
            return user;
        } else {
            return null;
        }

    }

    public Optional<User> getUserById(ObjectId id) {
        return userRepository.findById(id);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User updateUser(ObjectId id, User userDetails) throws Exception {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new Exception("User not found"));

        user.setName(userDetails.getName());
        user.setPassword(SecurityConfiguration.hashPassword(userDetails.getPassword()));
        return userRepository.save(user);
    }

    public void deleteUser(ObjectId id) {
        userRepository.deleteById(id);
    }

    public User addReservation(ObjectId userId, Reservation reservation) throws Exception {
        User user = userRepository.findById(userId).orElseThrow(() -> new Exception("User not found"));
        reservationRepository.save(reservation);
        user.getReservations().add(reservation);
        return userRepository.save(user);
    }

    public User deleteReservation(ObjectId userId, ObjectId reservationId) throws Exception {
        User user = userRepository.findById(userId).orElseThrow(() -> new Exception("User not found"));
        Reservation reservationToDelete = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new Exception("Reservation not found"));
        Car car = reservationToDelete.getCar();
        LocalDate pickupDate = reservationToDelete.getPickupDate();
        LocalDate dropDate = reservationToDelete.getDropDate();

        List<Reservation> overlappingReservations = reservationRepository.findByCarAndPickupDateLessThanEqualAndDropDateGreaterThanEqual(car.getId(), pickupDate, dropDate)
                .stream()
                .filter(reservation -> !reservation.getId().equals(reservationId))
                .toList();

        if (overlappingReservations.isEmpty()) {
            car.setAvailable(true);
            carService.updateCar(car.getId(), car);
        }

        user.getReservations().removeIf(r -> r.getId().equals(reservationId));
        reservationRepository.deleteById(reservationId);
        return userRepository.save(user);
    }

    public User updateReservation(ObjectId userId, ObjectId reservationId, Reservation updatedReservation) throws Exception {
        User user = userRepository.findById(userId).orElseThrow(() -> new Exception("User not found"));

        Reservation existingReservation = user.getReservations().stream()
                .filter(r -> r.getId().equals(reservationId))
                .findFirst()
                .orElseThrow(() -> new Exception("Reservation not found"));

        List<Reservation> overlappingReservations = reservationRepository.findByCarAndPickupDateLessThanEqualAndDropDateGreaterThanEqual(
                        updatedReservation.getCar().getId(), updatedReservation.getPickupDate(), updatedReservation.getDropDate())
                .stream()
                .filter(r -> !r.getId().equals(reservationId))
                .toList();

        if (!overlappingReservations.isEmpty()) {
            throw new Exception("Overlapping reservations exist for the selected dates");
        }
        user.getReservations().set(user.getReservations().indexOf(existingReservation), updatedReservation);
        return userRepository.save(user);
    }

}