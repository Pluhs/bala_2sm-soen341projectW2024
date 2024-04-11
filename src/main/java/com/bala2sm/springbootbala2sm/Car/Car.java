package com.bala2sm.springbootbala2sm.Car;

import com.bala2sm.springbootbala2sm.Branch.Branch;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.util.ArrayList;
//
@Document(collection = "cars")
public class Car {

	@Id
	@JsonSerialize(using= ToStringSerializer.class)
	private ObjectId id;
	private String name;//To be changed to make
	private String model;
	private int year;
	private String type;
	private String plateNum;
	private String vin;
	private String color;
	private Double price;
	private String info;
	private String imageUrl;
	private boolean available;
	private ArrayList<String> damages;
	private int milage;
	@DocumentReference
	private Branch branch;

	public Car() {
		super();
	}

	public Car(ObjectId id, String name, String model, int year, String type, String plateNum, String vin, String color, Double price, String info, String imageUrl, boolean available, ArrayList<String> damages, int milage, Branch branch) {
		this.id = id;
		this.name = name;
		this.model = model;
		this.year = year;
		this.type = type;
		this.plateNum = plateNum;
		this.vin = vin;
		this.color = color;
		this.price = price;
		this.info = info;
		this.imageUrl = imageUrl;
		this.available = available;
		this.damages = damages;
		this.milage = milage;
		this.branch = branch;
	}

	public ObjectId getId() {
		return id;
	}

	public void setId(ObjectId id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		if (price >= 0) {
			this.price = price;
		}
	}

	public void setModel(String model) {
		this.model = model;
	}

	public void setYear(int year) {
		this.year = year;
	}

	public void setType(String type) {
		this.type = type;
	}

	public void setPlateNum(String plateNum) {
		this.plateNum = plateNum;
	}

	public void setVin(String vin) {
		this.vin = vin;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public String getInfo() {
		return info;
	}

	public void setInfo(String info) {
		this.info = info;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	public boolean isAvailable() {
		return available;
	}

	public void setAvailable(boolean available) {
		this.available = available;
	}
	public ArrayList<String> getDamages() {
		return damages;
	}

	public void setDamages(ArrayList<String> damages) {
		this.damages = damages;
	}

	public String getModel() {
		return model;
	}

	public int getYear() {
		return year;
	}

	public String getType() {
		return type;
	}

	public String getPlateNum() {
		return plateNum;
	}

	public String getVin() {
		return vin;
	}

	public String getColor() {
		return color;
	}

	public Branch getBranch() {
		return branch;
	}

	public void setBranch(Branch branch) {
		this.branch = branch;
	}

	public int getMilage() {
		return milage;
	}

	public void setMilage(int milage) {
		this.milage = milage;
	}
}
