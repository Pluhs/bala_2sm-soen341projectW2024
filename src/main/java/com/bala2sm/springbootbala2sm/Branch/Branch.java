package com.bala2sm.springbootbala2sm.Branch;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "branches")
public class Branch {
    @Id
    @JsonSerialize(using= ToStringSerializer.class)
    private ObjectId id;
    private String name;
    private String address;//test
    private double lat;
    private double lng;

    // Constructor
    public Branch(ObjectId id, String address, double lat, double lng) {
        this.id = id;
        this.address = address;
        this.lat = lat;
        this.lng = lng;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public ObjectId getId() {
        return id;
    }

    public String getAddress() {
        return address;
    }

    public double getLat() {
        return lat;
    }

    public double getLng() {
        return lng;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public void setLat(double lat) {
        this.lat = lat;
    }

    public void setLng(double lng) {
        this.lng = lng;
    }
}

