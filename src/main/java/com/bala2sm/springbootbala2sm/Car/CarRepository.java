package com.bala2sm.springbootbala2sm.Car;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CarRepository extends MongoRepository<Car, ObjectId> {
    List<Car> findByAvailable(boolean available);
    List<Car> findByPriceBetween(Double minPrice, Double maxPrice);
}
