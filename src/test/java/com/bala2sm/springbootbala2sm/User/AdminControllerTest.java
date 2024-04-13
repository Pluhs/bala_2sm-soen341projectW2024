package com.bala2sm.springbootbala2sm.User;
import static org.hamcrest.Matchers.*;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.bala2sm.springbootbala2sm.Branch.Branch;
import com.bala2sm.springbootbala2sm.Car.Car;
import com.bala2sm.springbootbala2sm.Car.CarService;
import com.bala2sm.springbootbala2sm.Reservation.Reservation;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.bson.types.ObjectId;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import static org.mockito.ArgumentMatchers.any;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@ExtendWith(MockitoExtension.class)
class AdminControllerTest {

    private MockMvc mockMvc;

    @Mock
    private UserService userService;

    @Mock
    private CarService carService;

    @InjectMocks
    private AdminController adminController;

    @BeforeEach
    public void setup() {
        mockMvc = MockMvcBuilders.standaloneSetup(adminController).build();
    }
    private User createBasicUser() {
        ObjectId id = new ObjectId();
        String name = "John Doe";
        String email = "john.doe@example.com";
        String password = "password123";
        Role role = Role.USER;
        ArrayList<Reservation> reservations = new ArrayList<>();
        PaymentDetails paymentDetails = new PaymentDetails();

        return new User(id, name, email, password, role, reservations, paymentDetails);
    }
    @Test
    public void testCreateUserSuccess() throws Exception {
        User mockUser = createBasicUser();
        when(userService.createUser(any(User.class))).thenReturn(mockUser);

        mockMvc.perform(post("/admin/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJsonString(mockUser)))
                .andExpect(status().isOk());
        verify(userService, times(1)).createUser(any(User.class));
    }
    @Test
    public void testGetAllUsers() throws Exception {
        List<User> users = Arrays.asList(createBasicUser(), createBasicUser());
        when(userService.getAllUsers()).thenReturn(users);

        mockMvc.perform(get("/admin/users")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)));
        verify(userService, times(1)).getAllUsers();
    }
    @Test
    public void testGetUserFound() throws Exception {
        User mockUser = createBasicUser();
        when(userService.getUserById(any(ObjectId.class))).thenReturn(Optional.of(mockUser));

        mockMvc.perform(get("/admin/users/" + mockUser.getId().toHexString())
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
        verify(userService, times(1)).getUserById(any(ObjectId.class));
    }

    @Test
    public void testUpdateUser() throws Exception {
        User updatedUser = createBasicUser();
        when(userService.updateUser(any(ObjectId.class), any(User.class))).thenReturn(updatedUser);

        mockMvc.perform(put("/admin/users/" + updatedUser.getId().toHexString())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJsonString(updatedUser)))
                .andExpect(status().isOk());
        verify(userService, times(1)).updateUser(any(ObjectId.class), any(User.class));
    }
    @Test
    public void testDeleteUser() throws Exception {
        doNothing().when(userService).deleteUser(any(ObjectId.class));

        mockMvc.perform(delete("/admin/users/" + new ObjectId().toHexString())
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
        verify(userService, times(1)).deleteUser(any(ObjectId.class));
    }
//    @Test
//    public void testGetUserNotFound() throws Exception {
//        ObjectId id = new ObjectId();
//        when(userService.getUserById(id)).thenReturn(Optional.empty());
//
//        mockMvc.perform(get("/admin/users/" + id.toHexString())
//                        .contentType(MediaType.APPLICATION_JSON))
//                .andExpect(status().isNotFound());
//        verify(userService, times(1)).getUserById(id);
//    }
    @Test
    public void testGetAllCars() throws Exception {
        List<Car> cars = Arrays.asList(new Car(), new Car());
        when(carService.getAllCars()).thenReturn(cars);

        mockMvc.perform(get("/admin/cars")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)));
        verify(carService, times(1)).getAllCars();
    }

    @Test
    public void testCreateCar() throws Exception {
        ObjectId carId = new ObjectId();
        Car car = new Car(carId, "Tesla Model 3", "Model 3", 2021, "Sedan", "5YJ3E1EA7MF123456", "VIN123", "Blue", 50000.0, "Basic model", "https://example.com/image.jpg", true, new ArrayList<>(), 0, new Branch(new ObjectId(), "123 Main St", -34.9285, 138.6007));

        when(carService.addCar(any(Car.class))).thenReturn(car);

        mockMvc.perform(post("/admin/cars")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJsonString(car)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(car.getId().toHexString())));

        verify(carService, times(1)).addCar(any(Car.class));
    }

    private String asJsonString(final Object obj) {
        try {
            return new ObjectMapper()
                    .registerModule(new JavaTimeModule())
                    .writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
