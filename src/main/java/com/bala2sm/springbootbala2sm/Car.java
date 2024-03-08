package com.bala2sm.springbootbala2sm;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "cars")
public class Car {

	@Id
	private ObjectId id;
	private String name;
	private Double price;
	private String info;
	private String imageUrl;
	private boolean available;

	public Car() {
		super();
	}

	public Car(ObjectId id, String name, Double price, String info, String imageUrl) {
		super();
		this.id = id;
		this.name = name;
		this.price = price;
		this.info = info;
		this.imageUrl = imageUrl; // Renamed parameter to match the field name
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
		if (price >= 0) { // Validation for positive price
			this.price = price;
		}
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
}
