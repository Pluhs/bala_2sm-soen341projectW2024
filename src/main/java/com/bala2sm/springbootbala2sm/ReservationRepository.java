package com.bala2sm.springbootbala2sm;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface ReservationRepository extends MongoRepository<Reservation, ObjectId> {
    List<Reservation> findByPickupDate(LocalDate pickupDate);

    List<Reservation> findByDropDate(LocalDate dropDate);

    List<Reservation> findByCarAndPickupDateLessThanEqualAndDropDateGreaterThanEqual(ObjectId carId, LocalDate endDate, LocalDate startDate);
}