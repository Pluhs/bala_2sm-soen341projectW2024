package com.bala2sm.springbootbala2sm.User;

import static org.hamcrest.Matchers.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.mockito.ArgumentMatchers.any;

import com.bala2sm.springbootbala2sm.Branch.Branch;
import com.bala2sm.springbootbala2sm.Car.Car;
import com.bala2sm.springbootbala2sm.Car.CarService;
import com.bala2sm.springbootbala2sm.Reservation.EmailSender;
import com.bala2sm.springbootbala2sm.Reservation.MockBankService;
import com.bala2sm.springbootbala2sm.Reservation.Reservation;
import com.bala2sm.springbootbala2sm.Reservation.ReservationRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.bson.types.ObjectId;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Optional;

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
    private EmailSender emailSender;
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
    public void testSignInSuccess() throws Exception {
        User mockUser = createBasicUser();
        when(userService.signIn(anyString(), anyString())).thenReturn(mockUser);

        mockMvc.perform(post("/users/sign-in?email=john.doe@example.com&password=password123")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(header().exists("Set-Cookie"))
                .andExpect(jsonPath("$.userId", is(mockUser.getId().toString())));

        verify(userService, times(1)).signIn(anyString(), anyString());
    }

    @Test
    public void testSignInFailure() throws Exception {
        when(userService.signIn(anyString(), anyString())).thenReturn(null);

        mockMvc.perform(post("/users/sign-in?email=john.doe@example.com&password=password123")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isForbidden());

        verify(userService, times(1)).signIn(anyString(), anyString());
    }

//    @Test
//    public void testAddReservationConflict() throws Exception {
//        ObjectId userId = new ObjectId();
//        ObjectId carId = new ObjectId();
//        ArrayList<String> damages = new ArrayList<>(); // No damages listed
//        Branch branch = Mockito.mock(Branch.class); // Mock or create a new branch appropriately
//
//        // Sample Car creation according to the defined constructor
//        Car car = new Car(
//                carId,
//                "Tesla Model S",
//                "Model S",
//                2023,
//                "Electric",
//                "5YJSA1DNXDFP14760",
//                "VIN123456",
//                "Black",
//                75000.0,
//                "Top electric sedan",
//                "https://example.com/image.jpg",
//                true,
//                damages,
//                12000,
//                branch
//        );
//
//        Reservation reservation = new Reservation();
//        reservation.setCar(car);
//        reservation.setPickupDate(LocalDate.now());
//        reservation.setDropDate(LocalDate.now().plusDays(5));
//
//        when(carService.getCarById(any())).thenReturn(Optional.of(car));
//        when(reservationRepository.findByCarAndPickupDateLessThanEqualAndDropDateGreaterThanEqual(
//                any(ObjectId.class), any(LocalDate.class), any(LocalDate.class)))
//                .thenReturn(Collections.singletonList(reservation));
//
//        mockMvc.perform(post("/users/{userId}/reservations", userId.toHexString())
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(asJsonString(reservation)))
//                .andExpect(status().isConflict())
//                .andExpect(jsonPath("$", is("Car is already reserved for the selected dates")));
//
//        verify(userService, times(0)).addReservation(any(ObjectId.class), any(Reservation.class));
//    }
//
//    @Test
//    public void testSendConfirmationMailSuccess() throws Exception {
//        ObjectId userId = new ObjectId();
//        ObjectId reservationId = new ObjectId();
//        User user = createBasicUser();
//        user.setId(userId);
//        Reservation reservation = new Reservation();
//        reservation.setId(reservationId);
//        reservation.setCar(new Car());
//
//        when(userService.getUserById(userId)).thenReturn(Optional.of(user));
//        when(reservationRepository.findById(reservationId)).thenReturn(Optional.of(reservation));
//        when(carService.getCarById(any())).thenReturn(Optional.of(new Car()));
//
//        doNothing().when(emailSender).sendMail(anyString(), anyString(), anyString());
//
//        mockMvc.perform(post("/users/{userId}/mailConfirmation/{reservationId}", userId.toHexString(), reservationId.toHexString())
//                        .contentType(MediaType.APPLICATION_JSON))
//                .andExpect(status().isOk())
//                .andExpect(content().string("Email sent successfully"));
//
//        verify(emailSender, times(1)).sendMail(anyString(), anyString(), anyString());
//    }
    @Test
    public void testUpdateUserByEmailSuccess() throws Exception {
        User existingUser = createBasicUser();
        when(userService.updateUserByEmail(anyString(), any(User.class))).thenReturn(existingUser);

        mockMvc.perform(put("/users/update-by-email?email=" + existingUser.getEmail())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJsonString(existingUser)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.email", is(existingUser.getEmail())));

        verify(userService, times(1)).updateUserByEmail(anyString(), any(User.class));
    }

    @Test
    public void testUpdateUserByEmailNotFound() throws Exception {
        when(userService.updateUserByEmail(anyString(), any(User.class))).thenReturn(null);

        mockMvc.perform(put("/users/update-by-email?email=john.doe@example.com")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJsonString(createBasicUser())))
                .andExpect(status().isNotFound());

        verify(userService, times(1)).updateUserByEmail(anyString(), any(User.class));
    }

    @Test
    public void testDeleteUserByEmailSuccess() throws Exception {
        when(userService.deleteUserByEmail(anyString())).thenReturn(true);

        mockMvc.perform(delete("/users/delete-by-email?email=john.doe@example.com")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

        verify(userService, times(1)).deleteUserByEmail(anyString());
    }

    @Test
    public void testDeleteUserByEmailNotFound() throws Exception {
        when(userService.deleteUserByEmail(anyString())).thenReturn(false);

        mockMvc.perform(delete("/users/delete-by-email?email=john.doe@example.com")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());

        verify(userService, times(1)).deleteUserByEmail(anyString());
    }

    @Test
    public void testDeleteReservationByIdNotFound() throws Exception {
        when(userService.deleteReservation(any(ObjectId.class), any(ObjectId.class))).thenThrow(new RuntimeException("Reservation not found"));

        mockMvc.perform(delete("/users/{id}/reservations/{reservationId}", new ObjectId().toHexString(), new ObjectId().toHexString())
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound())
                .andExpect(content().string(containsString("Reservation not found")));

        verify(userService, times(1)).deleteReservation(any(ObjectId.class), any(ObjectId.class));
    }

    @Test
    public void testUpdateReservationNotFound() throws Exception {
        when(userService.updateReservation(any(ObjectId.class), any(ObjectId.class), any(Reservation.class))).thenThrow(new RuntimeException("Reservation not found"));

        mockMvc.perform(put("/users/{id}/reservations/{reservationId}", new ObjectId().toHexString(), new ObjectId().toHexString())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJsonString(new Reservation())))
                .andExpect(status().isNotFound())
                .andExpect(content().string(containsString("Reservation not found")));

        verify(userService, times(1)).updateReservation(any(ObjectId.class), any(ObjectId.class), any(Reservation.class));
    }
    private String asJsonString(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}

