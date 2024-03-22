package com.bala2sm.springbootbala2sm;

import com.bala2sm.springbootbala2sm.Car.CarService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.bson.types.ObjectId;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.hamcrest.Matchers.hasSize;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
public class UserControllerTest {

    private MockMvc mockMvc;

    @Mock
    private UserService userService;

    @Mock
    private CarService carService;
    @Mock
    private MockBankService mockBankService;
    @Mock
    private ReservationRepository reservationRepository;

    @InjectMocks
    private UserController userController;

    @BeforeEach
    public void setup() {
        mockMvc = MockMvcBuilders.standaloneSetup(userController).build();
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
    public void testGetAllUsers() throws Exception {
        List<User> users = Arrays.asList(createBasicUser(), createBasicUser());
        when(userService.getAllUsers()).thenReturn(users);

        mockMvc.perform(get("/users")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)));
        verify(userService, times(1)).getAllUsers();
    }
    @Test
    public void testCreateUser() throws Exception {
        User mockUser = createBasicUser();
        when(userService.createUser(any(User.class))).thenReturn(mockUser);

        mockMvc.perform(post("/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJsonString(mockUser)))
                .andExpect(status().isOk());
        verify(userService, times(1)).createUser(any(User.class));
    }
    @Test
    public void testGetUserProfileFound() throws Exception {
        User mockUser = createBasicUser();
        when(userService.getUserById(any(ObjectId.class))).thenReturn(Optional.of(mockUser));

        mockMvc.perform(get("/users/" + mockUser.getId().toHexString())
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
        verify(userService, times(1)).getUserById(any(ObjectId.class));
    }

    @Test
    public void testGetUserProfileNotFound() throws Exception {
        when(userService.getUserById(any(ObjectId.class))).thenReturn(Optional.empty());

        mockMvc.perform(get("/users/" + new ObjectId().toHexString())
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());
        verify(userService, times(1)).getUserById(any(ObjectId.class));
    }
    @Test
    public void testUpdateUserProfile() throws Exception {
        User updatedUser = createBasicUser();
        when(userService.updateUser(any(ObjectId.class), any(User.class))).thenReturn(updatedUser);

        mockMvc.perform(put("/users/" + updatedUser.getId().toHexString())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJsonString(updatedUser)))
                .andExpect(status().isOk());
        verify(userService, times(1)).updateUser(any(ObjectId.class), any(User.class));
    }
    @Test
    public void testDeleteUserProfile() throws Exception {
        doNothing().when(userService).deleteUser(any(ObjectId.class));

        mockMvc.perform(delete("/users/" + new ObjectId().toHexString())
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
        verify(userService, times(1)).deleteUser(any(ObjectId.class));
    }
    private String asJsonString(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
    @Test
    void testMakePayment() {
        ObjectId userId = new ObjectId();
        PaymentDetails paymentDetails = new PaymentDetails("1234567890123456", 100.0);

        when(mockBankService.authorizePayment(anyString(), anyDouble())).thenReturn(true);

        ResponseEntity<?> response = userController.makePayment(userId, paymentDetails);

        assertEquals(HttpStatus.OK, response.getStatusCode(), "Payment should be successful");
    }

    @Test
    void testProcessRefund() {
        ObjectId userId = new ObjectId();
        PaymentDetails paymentDetails = new PaymentDetails("1234567890123456", 100.0);

        when(mockBankService.processRefund(anyString(), anyDouble())).thenReturn(true);

        ResponseEntity<?> response = userController.processRefund(userId, paymentDetails);

        assertEquals(HttpStatus.OK, response.getStatusCode(), "Refund should be processed successfully");
    }
}

