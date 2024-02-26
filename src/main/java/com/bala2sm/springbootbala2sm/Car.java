package com.bala2sm.springbootbala2sm;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection ="cars")
public class Car {
	
	@Id
	private ObjectId id;
	
	private String name;
	private Double price;
	private String info;
	private String img;//url
	private boolean available;
	
	
	
	public Car() {
		super();
	}
	public Car(ObjectId id, String name, Double price, String info, String url) {
		super();
		this.id = id;
		this.name = name;
		this.price = price;
		this.info = info;
		this.img = url;
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
	 * @return the name
	 */
	public String getName() {
		return name;
	}
	/**
	 * @param name the name to set
	 */
	public void setName(String name) {
		this.name = name;
	}
	/**
	 * @return the price
	 */
	public Double getPrice() {
		return price;
	}
	/**
	 * @param price the price to set
	 */
	public void setPrice(Double price) {
		this.price = price;
	}
	/**
	 * @return the info
	 */
	public String getInfo() {
		return info;
	}
	/**
	 * @param info the info to set
	 */
	public void setInfo(String info) {
		this.info = info;
	}
	/**
	 * @return the url
	 */
	public String getUrl() {
		return img;
	}
	/**
	 * @param url the url to set
	 */
	public void setUrl(String url) {
		this.img = url;
	}
	public boolean isAvailable() {
		return available;
	}
	public void setAvailable(boolean available) {
		this.available = available;
	}
	
	
	
}
