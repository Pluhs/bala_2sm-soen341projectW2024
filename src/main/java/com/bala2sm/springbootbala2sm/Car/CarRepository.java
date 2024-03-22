package com.bala2sm.springbootbala2sm.Car;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CarRepository extends MongoRepository<Car, ObjectId> {
    List<Car> findByAvailable(boolean available);
    List<Car> findByPriceBetween(Double minPrice, Double maxPrice);
    List<Car> findByName(String name);
    List<Car> findByYear(int year);
    List<Car> findByType(String type);
    List<Car> findByColor(String color);
    List<Car> findByBranch_Id(ObjectId branchId);

}
