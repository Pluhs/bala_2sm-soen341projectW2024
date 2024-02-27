package com.bala2sm.springbootbala2sm;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.bson.types.ObjectId;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class VehicleService {

    @Autowired
    private CarRepository carRepository;

    public List<Car> getAvailableVehicles() {
        return carRepository.findAll().stream()
                .filter(Car::isAvailable)
                .collect(Collectors.toList());
    }

    public Car addVehicle(Car car) {
        return carRepository.save(car);
    }

    public Optional<Car> getVehicleById(ObjectId id) {
        return carRepository.findById(id);
    }

    public Car updateVehicle(ObjectId id, Car carDetails) {
        return carRepository.findById(id)
                .map(car -> {
                    car.setName(carDetails.getName());
                    car.setPrice(carDetails.getPrice());
                    car.setInfo(carDetails.getInfo());
                    car.setImageUrl(carDetails.getImageUrl());
                    car.setAvailable(carDetails.isAvailable());
                    return carRepository.save(car);
                })
                .orElseGet(() -> {
                    carDetails.setId(id);
                    return carRepository.save(carDetails);
                });
    }

    public void deleteVehicle(ObjectId id) {
        carRepository.deleteById(id);
    }
}
