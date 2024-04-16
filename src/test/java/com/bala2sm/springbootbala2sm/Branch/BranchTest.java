package com.bala2sm.springbootbala2sm.Branch;

import org.bson.types.ObjectId;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class BranchTest {
    @Test
    void testBranchConstructorAndGetters() {
        ObjectId id = new ObjectId();
        String address = "123 Main St";
        double lat = -34.9285;
        double lng = 138.6007;

        Branch branch = new Branch(id, address, lat, lng);

        assertEquals(id, branch.getId());
        assertEquals(address, branch.getAddress());
        assertEquals(lat, branch.getLat());
        assertEquals(lng, branch.getLng());
    }

    @Test
    void testSetters() {
        Branch branch = new Branch(new ObjectId(), "123 Main St", -34.9285, 138.6007);
        ObjectId newId = new ObjectId();
        String newName = "New Branch";
        String newAddress = "456 Elm St";
        double newLat = -35.0000;
        double newLng = 139.0000;

        branch.setId(newId);
        branch.setName(newName);
        branch.setAddress(newAddress);
        branch.setLat(newLat);
        branch.setLng(newLng);

        assertEquals(newId, branch.getId());
        assertEquals(newName, branch.getName());
        assertEquals(newAddress, branch.getAddress());
        assertEquals(newLat, branch.getLat());
        assertEquals(newLng, branch.getLng());
    }
}
