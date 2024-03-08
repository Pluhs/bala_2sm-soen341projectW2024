package com.bala2sm.springbootbala2sm;

import com.mongodb.DuplicateKeyException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.bson.types.ObjectId;

import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User createUser(User user) {
//        try{
        System.out.print(userRepository.findByEmail(user.getEmail()));
            if(userRepository.findByEmail(user.getEmail()) != null) {
                return null;
            }
            user.setRole(Role.USER);
            user.setPassword(SecurityConfiguration.hashPassword(user.getPassword()));
            return userRepository.save(user);
//        }catch (DuplicateKeyException e) {
//            // Handle the duplicate email exception
//            throw new Exception("Email already exists", e);
//        }
    }

    public User signIn(String email, String password) {
        User user = userRepository.findByEmail(email);
        String hashedPassword;

            hashedPassword = SecurityConfiguration.hashPassword(password);

        if (user != null && user.getPassword().equals(hashedPassword)) {
            return user;
        } else {
            return null; // Authentication failed
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
        // Only name and password can be updated
        return userRepository.save(user);
    }

    public void deleteUser(ObjectId id) {
        userRepository.deleteById(id);
    }

    public User addReservation(ObjectId userId, Reservation reservation) throws Exception {
        User user = userRepository.findById(userId).orElseThrow(() -> new Exception("User not found"));
        user.getReservations().add(reservation);
        return userRepository.save(user);
    }

//    public User deleteReservation(ObjectId userId, ObjectId reservationId) throws Exception {
//        User user = userRepository.findById(userId).orElseThrow(() -> new Exception("User not found"));
//        user.getReservations().removeIf(r -> r.getId().equals(reservationId));
//        return userRepository.save(user);
//    }

//    public User updateReservation(ObjectId userId, ObjectId reservationId, Reservation updatedReservation) throws Exception {
//        User user = userRepository.findById(userId).orElseThrow(() -> new Exception("User not found"));
//        ArrayList<Reservation> reservations = user.getReservations();
//        for (int i = 0; i < reservations.size(); i++) {
//            if (reservations.get(i).getId().equals(reservationId)) {
//                reservations.set(i, updatedReservation); // Replace the old reservation with the updated one
//                break;
//            }
//        }
//        user.setReservations(reservations);
//        return userRepository.save(user);
//    }
}