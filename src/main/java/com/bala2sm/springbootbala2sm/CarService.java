package com.bala2sm.springbootbala2sm;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.bson.types.ObjectId;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CarService {

    @Autowired
    private CarRepository carRepository;

    public List<Car> getAvailableCars() {
        return carRepository.findAll().stream()
                .filter(Car::isAvailable)
                .collect(Collectors.toList());
    }
    
    public List<Car> getAllCars(){
    	return carRepository.findAll();
    }

    public Car addCar(Car car) {
        return carRepository.save(car);
    }

    public Optional<Car> getCarById(ObjectId id) {
        return carRepository.findById(id);
    }

    public Car updateCar(ObjectId id, Car carDetails) {
        return carRepository.findById(id)
                .map(car -> {
                    car.setName(carDetails.getName());
                    car.setPrice(carDetails.getPrice());
                    car.setInfo(carDetails.getInfo());
                    car.setImageUrl(carDetails.getImageUrl());
                    car.setAvailable(carDetails.isAvailable());
                    car.setDamages(carDetails.getDamages());
                    return carRepository.save(car);
                })
                .orElseGet(() -> {
                    carDetails.setId(id);
                    return carRepository.save(carDetails);
                });
    }
    public void deleteCar(ObjectId id) {
        carRepository.deleteById(id);
    }
    public Optional<Car> inspectCar(ObjectId id, ArrayList<String> damages) {
        return carRepository.findById(id)
                .map(car -> {
                    car.setDamages(damages);
                    return carRepository.save(car);
                });
    }

    public List<Car> getCarsByName(String name) {
        return carRepository.findByName(name);
    }

    public List<Car> getCarsByYear(int year) {
        return carRepository.findByYear(year);
    }

    public List<Car> getCarsByType(String type) {
        return carRepository.findByType(type);
    }

    public List<Car> getCarsByColor(String color) {
        return carRepository.findByColor(color);
    }

    public List<Car> getCarsByPriceRange(Double minPrice, Double maxPrice) {
        return carRepository.findByPriceBetween(minPrice, maxPrice);
    }

}
