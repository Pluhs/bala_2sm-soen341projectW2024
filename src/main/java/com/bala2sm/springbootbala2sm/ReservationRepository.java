package com.bala2sm.springbootbala2sm;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;


public interface ReservationRepository extends MongoRepository<Reservation,ObjectId>{
  
}
