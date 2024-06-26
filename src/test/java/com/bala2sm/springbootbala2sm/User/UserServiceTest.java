package com.bala2sm.springbootbala2sm.User;

import com.bala2sm.springbootbala2sm.Car.CarService;
import com.bala2sm.springbootbala2sm.Reservation.Reservation;
import com.bala2sm.springbootbala2sm.Reservation.ReservationRepository;
import com.bala2sm.springbootbala2sm.SecurityConfiguration;
import com.bala2sm.springbootbala2sm.User.*;
import org.bson.types.ObjectId;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import com.bala2sm.springbootbala2sm.Car.Car;

import java.time.LocalDate;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;


@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private ReservationRepository reservationRepository;

    @Mock
    private CarService carService;

    @InjectMocks
    private UserService userService;
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
    public void testCreateUserSuccess() {
        User user = createBasicUser();
        when(userRepository.findByEmail(user.getEmail())).thenReturn(null);
        when(userRepository.save(any(User.class))).thenReturn(user);

        User result = userService.createUser(user);

        assertNotNull(result);
        verify(userRepository, times(1)).save(user);
    }

    @Test
    public void testCreateUserFailureDueToExistingEmail() {
        User user = createBasicUser();
        when(userRepository.findByEmail(user.getEmail())).thenReturn(user);

        User result = userService.createUser(user);

        assertNull(result);
        verify(userRepository, never()).save(user);
    }
    @Test
    public void testSignInSuccess() {
        User user = createBasicUser();
        String hashedPassword = SecurityConfiguration.hashPassword("password123");
        user.setPassword(hashedPassword);

        when(userRepository.findByEmail(user.getEmail())).thenReturn(user);

        User result = userService.signIn(user.getEmail(), "password123");

        assertNotNull(result);
    }

    @Test
    public void testSignInFailure() {
        when(userRepository.findByEmail(anyString())).thenReturn(null);

        User result = userService.signIn("test@example.com", "wrongPassword");

        assertNull(result);
    }
    @Test
    public void testGetUserByIdFound() {
        ObjectId id = new ObjectId();
        User user = createBasicUser();
        when(userRepository.findById(id)).thenReturn(Optional.of(user));

        Optional<User> result = userService.getUserById(id);

        assertTrue(result.isPresent());
        assertEquals(user.getId(), result.get().getId());
    }

    @Test
    public void testGetUserByIdNotFound() {
        ObjectId id = new ObjectId();
        when(userRepository.findById(id)).thenReturn(Optional.empty());

        Optional<User> result = userService.getUserById(id);

        assertFalse(result.isPresent());
    }
    @Test
    public void testGetAllUsers() {
        List<User> users = Arrays.asList(createBasicUser(), createBasicUser());
        when(userRepository.findAll()).thenReturn(users);

        List<User> result = userService.getAllUsers();

        assertEquals(2, result.size());
    }
    @Test
    public void testUpdateUserSuccess() throws Exception {
        ObjectId id = new ObjectId();
        User existingUser = createBasicUser();
        User updatedDetails = createBasicUser();
        updatedDetails.setName("Updated Name");

        when(userRepository.findById(id)).thenReturn(Optional.of(existingUser));
        when(userRepository.save(any(User.class))).thenReturn(updatedDetails);

        User result = userService.updateUser(id, updatedDetails);

        assertEquals("Updated Name", result.getName());
    }

    @Test
    public void testUpdateUserNotFound() {
        ObjectId id = new ObjectId();
        User updatedDetails = createBasicUser();

        when(userRepository.findById(id)).thenReturn(Optional.empty());

        assertThrows(Exception.class, () -> {
            userService.updateUser(id, updatedDetails);
        });
    }
    @Test
    public void testDeleteUser() {
        ObjectId id = new ObjectId();
        doNothing().when(userRepository).deleteById(id);

        userService.deleteUser(id);

        verify(userRepository, times(1)).deleteById(id);
    }
    @Test
    public void testAddReservation() throws Exception {
        User user = createBasicUser();
        ObjectId userId = user.getId();
        Reservation reservation = new Reservation();
        Car car = new Car();
        reservation.setCar(car);

        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(reservationRepository.save(reservation)).thenReturn(reservation);
        when(userRepository.save(user)).thenReturn(user);

        User result = userService.addReservation(userId, reservation);

        assertTrue(result.getReservations().contains(reservation));
    }

    @Test
    public void testUpdateReservationSuccess() throws Exception {
        ObjectId userId = new ObjectId();
        ObjectId reservationId = new ObjectId();
        User user = createBasicUser();
        Reservation originalReservation = new Reservation();
        originalReservation.setId(reservationId);
        originalReservation.setPickupDate(LocalDate.now());
        originalReservation.setDropDate(LocalDate.now().plusDays(5));
        Car car = new Car();
        originalReservation.setCar(car);

        Reservation updatedReservation = new Reservation();
        updatedReservation.setCar(car);
        updatedReservation.setPickupDate(LocalDate.now().plusDays(1));
        updatedReservation.setDropDate(LocalDate.now().plusDays(6));
        updatedReservation.setId(reservationId);

        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(reservationRepository.findById(reservationId)).thenReturn(Optional.of(originalReservation));
        when(reservationRepository.save(any(Reservation.class))).thenReturn(updatedReservation);
        when(carService.getCarById(any())).thenReturn(Optional.of(car));

        Reservation result = userService.updateReservation(userId, reservationId, updatedReservation);

        assertEquals(LocalDate.now().plusDays(1), result.getPickupDate());
        assertEquals(LocalDate.now().plusDays(6), result.getDropDate());
    }


}
