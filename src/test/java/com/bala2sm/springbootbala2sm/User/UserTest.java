package com.bala2sm.springbootbala2sm.User;

import com.bala2sm.springbootbala2sm.Reservation.Reservation;
import com.bala2sm.springbootbala2sm.User.Role;
import com.bala2sm.springbootbala2sm.User.User;
import org.bson.types.ObjectId;
import org.junit.jupiter.api.Test;
import java.util.ArrayList;
import static org.junit.jupiter.api.Assertions.*;

class UserTest {

    @Test
    void testUserGettersAndSetters() {
        ObjectId id = new ObjectId();
        User user = new User();
        user.setId(id);
        user.setName("John Doe");
        user.setEmail("john@example.com");
        user.setPassword("password");
        user.setRole(Role.USER);
        ArrayList<Reservation> reservations = new ArrayList<>();
        user.setReservations(reservations);

        assertEquals(id, user.getId());
        assertEquals("John Doe", user.getName());
        assertEquals("john@example.com", user.getEmail());
        assertEquals("password", user.getPassword());
        assertEquals(Role.USER, user.getRole());
        assertEquals(reservations, user.getReservations());
    }
}
