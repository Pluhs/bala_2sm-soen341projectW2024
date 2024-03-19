package com.bala2sm.springbootbala2sm;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonValue;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;

import java.util.ArrayList;

@Document(collection = "cars")
public class Car {

	@Id
	@JsonSerialize(using= ToStringSerializer.class)
	private ObjectId id;
	private String name;
	private Double price;
	private String info;
	private String imageUrl;
	private boolean available;
	private ArrayList<String> damages;
	public Car() {
		super();
	}

	public Car(ObjectId id, String name, Double price, String info, String imageUrl, ArrayList<String> damages) {
		super();
		this.id = id;
		this.name = name;
		this.price = price;
		this.info = info;
		this.imageUrl = imageUrl;
		this.damages = damages;
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
}
