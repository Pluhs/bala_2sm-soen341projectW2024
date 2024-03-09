package com.bala2sm.springbootbala2sm;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.time.LocalDate;

@Document(collection = "reservations")
public class Reservation {

	@Id
	private ObjectId id;
	private LocalDate pickupDate; // Changed to LocalDate
	private LocalDate dropDate;   // Changed to LocalDate
	@DBRef(db="cars")
	private Car car;

	public Reservation() {
		super();
	}

	public Reservation(ObjectId id, LocalDate pickupDate, LocalDate dropDate, Car car) {
		super();
		this.id = id;
		this.pickupDate = pickupDate;
		this.dropDate = dropDate;
		this.car = car;
	}

	public LocalDate getPickupDate() {
		return pickupDate;
	}

	public void setPickupDate(LocalDate pickupDate) {
		this.pickupDate = pickupDate;
	}

	public LocalDate getDropDate() {
		return dropDate;
	}

	public void setDropDate(LocalDate dropDate) {
		this.dropDate = dropDate;
	}

	public Car getCar() {
		return car;
	}

	public void setCar(Car car) {
		this.car = car;
	}
	public void setId (ObjectId id){
		this.id= id;
	}
	public ObjectId getId (){
		return id;
	}
}
