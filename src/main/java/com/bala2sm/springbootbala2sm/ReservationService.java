package com.bala2sm.springbootbala2sm;

import java.util.List;
import java.util.Optional;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;

@Service
public class ReservationService {

    @Autowired
    private ReservationRepository reservationRepository;

    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }

    public Optional<Reservation> getReservationById(ObjectId id) {
        return reservationRepository.findById(id);
    }

    public Reservation createReservation(Reservation reservation) {
        validateReservation(reservation);
        return reservationRepository.save(reservation);
    }

    public Reservation updateReservation(ObjectId id, Reservation reservation) {
        validateReservation(reservation);
        if (!reservationRepository.existsById(id)) {
            throw new IllegalArgumentException("Reservation with ID " + id + " does not exist.");
        }
        reservation.setId(id);
        return reservationRepository.save(reservation);
    }

    public void deleteReservation(ObjectId id) {
        reservationRepository.deleteById(id);
    }

    private void validateReservation(Reservation reservation) {
        if (reservation == null || reservation.getPickupDate() == null
                || reservation.getDropDate() == null || reservation.getCar() == null) {
            throw new IllegalArgumentException("Invalid reservation details.");
        }

        if (reservation.getPickupDate().isAfter(reservation.getDropDate())) {
            throw new IllegalArgumentException("Pickup date must be before drop date.");
        }
    }
}
