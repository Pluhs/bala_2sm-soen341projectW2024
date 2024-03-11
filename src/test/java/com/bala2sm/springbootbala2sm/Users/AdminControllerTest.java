package com.bala2sm.springbootbala2sm.Users;

import com.bala2sm.springbootbala2sm.*;
import com.fasterxml.jackson.databind.ObjectMapper;
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

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.hamcrest.Matchers.hasSize;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
public class AdminControllerTest {

    private MockMvc mockMvc;

    @Mock
    private UserService userService;

    @Mock
    private CarService carService;

    @InjectMocks
    private AdminController adminController;
    private User createBasicUser() {
        ObjectId id = new ObjectId();
        String name = "John Doe";
        String email = "john.doe@example.com";
        String password = "password123";
        Role role = Role.USER;
        ArrayList<Reservation> reservations = new ArrayList<>();

        return new User(id, name, email, password, role, reservations);
    }
//    private User createAdminUser() {
//        User adminUser = createBasicUser();
//        adminUser.setRole(Role.ADMIN);
//        return adminUser;
//    }
    @BeforeEach
    public void setup() {
        mockMvc = MockMvcBuilders.standaloneSetup(adminController).build();
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
    public void testGetUserNotFound() throws Exception {
        ObjectId id = new ObjectId();
        when(userService.getUserById(id)).thenReturn(Optional.empty());

        mockMvc.perform(get("/admin/users/" + id.toHexString())
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());
        verify(userService, times(1)).getUserById(id);
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
    private String asJsonString(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
