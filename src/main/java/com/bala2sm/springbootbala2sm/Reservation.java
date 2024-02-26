package com.bala2sm.springbootbala2sm;


import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;


@Document(collection ="reservations")
public class Reservation {
	
	

	@Id
	private ObjectId id;
	
	private String pickupDate;
	private String dropDate;
	
	@DocumentReference
	private Car car;

	
	
	public Reservation() {
		super();
	}

	public Reservation(ObjectId id, String pickupDate, String dropDate, Car car) {
		super();
		this.id = id;
		this.pickupDate = pickupDate;
		this.dropDate = dropDate;
		
		
		this.car = car;
	}
	/**
	 * @return the id
	 */
	public ObjectId getId() {
		return id;
	}

	/**
	 * @param id the id to set
	 */
	public void setId(ObjectId id) {
		this.id = id;
	}

	/**
	 * @return the pickupDate
	 */
	public String getPickupDate() {
		return pickupDate;
	}

	/**
	 * @param pickupDate the pickupDate to set
	 */
	public void setPickupDate(String pickupDate) {
		this.pickupDate = pickupDate;
	}

	/**
	 * @return the dropDate
	 */
	public String getDropDate() {
		return dropDate;
	}

	/**
	 * @param dropDate the dropDate to set
	 */
	public void setDropDate(String dropDate) {
		this.dropDate = dropDate;
	}

	/**
	 * @return the car
	 */
	public Car getCar() {
		return car;
	}

	/**
	 * @param car the car to set
	 */
	public void setCar(Car car) {
		this.car = car;
	}

}
