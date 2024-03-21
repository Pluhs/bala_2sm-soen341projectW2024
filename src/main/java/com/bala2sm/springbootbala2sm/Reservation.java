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
	private double insurancePrice = 70;
	private boolean cleaning;
	private double cleaningPrice = 35;
	private boolean pickedUp;
	private boolean returned;
	private String cardNum;

	public Reservation() {
		super();
	}

	public Reservation(ObjectId id, LocalDate pickupDate, LocalDate dropDate, Car car, String userAddress, String phoneNumber, String driverLicense, boolean insurance, boolean cleaning, boolean pickedUp, boolean returned, String cardNum) {
		this.id = id;
		this.pickupDate = pickupDate;
		this.dropDate = dropDate;
		this.car = car;
		this.userAddress = userAddress;
		this.phoneNumber = phoneNumber;
		this.driverLicense = driverLicense;
		this.insurance = insurance;
		this.cleaning = cleaning;
		this.pickedUp = pickedUp;
		this.returned = returned;
		this.cardNum = cardNum;
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

	public void setInsurancePrice(double insurancePrice) {
		this.insurancePrice = insurancePrice;
	}

	public void setCleaningPrice(double cleaningPrice) {
		this.cleaningPrice = cleaningPrice;
	}

	public String getCardNum() {
		return cardNum;
	}

	public void setCardNum(String cardNum) {
		this.cardNum = cardNum;
	}
}