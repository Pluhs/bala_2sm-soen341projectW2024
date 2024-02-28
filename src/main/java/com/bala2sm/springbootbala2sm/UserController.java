//package com.bala2sm.springbootbala2sm;
//
//import org.bson.types.ObjectId;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//@RestController
//@RequestMapping("/users")
//public class UserController {
//
//    @Autowired
//    private UserService userService;
//    @GetMapping("/{id}")
//    public ResponseEntity<?> getUserProfile(@PathVariable ObjectId id) {
//        return userService.getUserById(id)
//                .map(ResponseEntity::ok)
//                .orElseGet(() -> ResponseEntity.notFound().build());
//    }
//
//    // Endpoint to update user profile
//    @PutMapping("/{id}")
//    public ResponseEntity<?> updateUserProfile(@PathVariable ObjectId id, @RequestBody User user) {
//        return userService.updateUser(id, user)
//                .map(ResponseEntity::ok)
//                .orElseGet(() -> ResponseEntity.notFound().build());
//    }
//
//    // Endpoint to delete user profile
//    @DeleteMapping("/{id}")
//    public ResponseEntity<?> deleteUserProfile(@PathVariable ObjectId id) {
//        userService.deleteUser(id);
//        return ResponseEntity.ok().build();
//    }
//}
