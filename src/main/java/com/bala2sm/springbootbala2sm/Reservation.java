package com.bala2sm.springbootbala2sm;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;

import java.time.LocalDate;

@Document(collection = "reservations")
public class Reservation {

	@Id
	@JsonSerialize(using= ToStringSerializer.class)
	private ObjectId id;
	private LocalDate pickupDate;
	private LocalDate dropDate;
	@DocumentReference
	private Car car;
	private String userAddress;
	private String phoneNumber;
	private String driverLicense;
	private boolean insurance;
	private final double insurancePrice = 70;
	private boolean cleaning;
	private final double cleaningPrice = 35;
	private boolean pickedUp = false;
	private boolean returned = false;

	public Reservation() {
		super();
	}

	public Reservation(ObjectId id, LocalDate pickupDate, LocalDate dropDate, Car car, String userAddress, String phoneNumber, String driverLicense, boolean insurance, boolean cleaning) {
		this.id = id;
		this.pickupDate = pickupDate;
		this.dropDate = dropDate;
		this.car = car;
		this.userAddress = userAddress;
		this.phoneNumber = phoneNumber;
		this.driverLicense = driverLicense;
		this.insurance = insurance;
		this.cleaning = cleaning;
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

	public String getUserAddress() {
		return userAddress;
	}

	public void setUserAddress(String userAddress) {
		this.userAddress = userAddress;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public String getDriverLicense() {
		return driverLicense;
	}

	public void setDriverLicense(String driverLicense) {
		this.driverLicense = driverLicense;
	}

	public boolean insurance() {
		return insurance;
	}

	public void setInsurance(boolean insurance) {
		this.insurance = insurance;
	}

	public double getInsurancePrice() {
		return insurancePrice;
	}

	public boolean cleaning() {
		return cleaning;
	}

	public void setCleaning(boolean cleaning) {
		this.cleaning = cleaning;
	}

	public double getCleaningPrice() {
		return cleaningPrice;
	}

	public boolean pickedUp() {
		return pickedUp;
	}

	public void setPickedUp(boolean pickedUp) {
		this.pickedUp = pickedUp;
	}

	public boolean returned() {
		return returned;
	}

	public void setReturned(boolean returned) {
		this.returned = returned;
	}

	@Override
	public String toString() {
		return "Reservation{" +
				"id=" + id +
				", pickupDate=" + pickupDate +
				", dropDate=" + dropDate +
				", car=" + car +
				", userAddress='" + userAddress + '\'' +
				", phoneNumber='" + phoneNumber + '\'' +
				", driverLicense='" + driverLicense + '\'' +
				", insurance=" + insurance +
				", insurancePrice=" + insurancePrice +
				", cleaning=" + cleaning +
				", cleaningPrice=" + cleaningPrice +
				", pickedUp=" + pickedUp +
				", returned=" + returned +
				'}';
	}
}
