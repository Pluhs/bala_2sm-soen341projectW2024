//package com.bala2sm.springbootbala2sm;
//
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.Mockito;
//import org.mockito.junit.jupiter.MockitoExtension;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//
//import static org.junit.jupiter.api.Assertions.assertEquals;
//import static org.mockito.Mockito.*;
//
//@ExtendWith(MockitoExtension.class)
//public class UserControllerTest {
//
//    @Mock
//    private UserService userService;
//
//    @InjectMocks
//    private UserController userController;
//
//    private User user;
//
//    @BeforeEach
//    public void setUp() {
////        // Initialize a User object to be used in the tests
////        user = new User();
//        user = Mockito.mock(User.class);
//    }
//
//    @Test
//    public void testCreateUser() throws Exception {
//        // Arrange
//        when(userService.createUser(any(User.class))).thenReturn(user);
//
//        // Act
//        ResponseEntity<User> response = userController.createUser(user);
//
//        // Assert
//        assertEquals(HttpStatus.CREATED, response.getStatusCode());
//        assertEquals(user, response.getBody());
//        verify(userService, times(1)).createUser(any(User.class));
//    }
//
//    @Test
//    public void addReservertion(){
//
//    }
//}
//
