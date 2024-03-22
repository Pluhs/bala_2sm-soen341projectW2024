package com.bala2sm.springbootbala2sm;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import jakarta.mail.MessagingException;

import java.util.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private CarService carService;
    @Autowired
    private MockBankService mockBankService;
    @Autowired
    private ReservationRepository reservationRepository;
    @Autowired
    private EmailSender emailSender;
    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {

        User newUser = userService.createUser(user);
        if(newUser != null){
            return new ResponseEntity<>(newUser, HttpStatus.OK);
        }
        return new ResponseEntity<>(null, HttpStatus.CONFLICT);

    }

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUserProfile(@PathVariable ObjectId id) {
        return userService.getUserById(id)
                .map(user -> ResponseEntity.ok().body(user))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/email")
    public ResponseEntity<?> getUserByEmail(@RequestParam String email) {
        User user = userService.getUserByEmail(email);
        if (user != null) {
            return ResponseEntity.ok().body(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateUserProfile(@PathVariable ObjectId id, @RequestBody User user) {
        try {
            User updatedUser = userService.updateUser(id, user);
            return ResponseEntity.ok(updatedUser);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Endpoint to delete user profile
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUserProfile(@PathVariable ObjectId id) {
        userService.deleteUser(id);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/delete-by-email")
    public ResponseEntity<?> deleteUserByEmail(@RequestParam String email) {
        boolean isDeleted = userService.deleteUserByEmail(email);
        if (isDeleted) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Endpoint to update user by email
    @PutMapping("/update-by-email")
    public ResponseEntity<?> updateUserByEmail(@RequestParam String email, @RequestBody User updatedUser) {
        User user = userService.updateUserByEmail(email, updatedUser);
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @PostMapping("/sign-in")
    public ResponseEntity<Map<String, Object>> signIn(@RequestParam String email, @RequestParam String password) {
        User user = userService.signIn(email,password);
        if (user != null){
            String cookieValue = ResponseCookie.from("userId", user.getId().toString())
                    .path("/")
                    .maxAge(7 * 24 * 60 * 60)
                    .sameSite("Lax")
                    .build()
                    .toString();

            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.SET_COOKIE, cookieValue);

            Map<String, Object> responseBody = new HashMap<>();
            responseBody.put("user", user);
            responseBody.put("userId", user.getId().toString());

            return ResponseEntity.ok().headers(headers).body(responseBody);

        }
        else
            return new ResponseEntity<>(null, HttpStatus.FORBIDDEN);
    }

    @PostMapping("/{userId}/reservations")
    public ResponseEntity<?> addReservation(@PathVariable ObjectId userId, @RequestBody Reservation reservation) {
        try {
            if (userId == null || reservation.getCar().getId() == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid or null ID provided");
            }
            Car car = carService.getCarById(reservation.getCar().getId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Car not found"));
            reservation.setCar(car);

            List<Reservation> overlappingReservations = reservationRepository.findByCarAndPickupDateLessThanEqualAndDropDateGreaterThanEqual(
                    car.getId(), reservation.getPickupDate(), reservation.getDropDate());

            if (!overlappingReservations.isEmpty()) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Car is already reserved for the selected dates");
            }
            User updatedUser = userService.addReservation(userId, reservation);
            return ResponseEntity.ok(updatedUser);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
    @DeleteMapping("/{id}/reservations/{reservationId}")
    public ResponseEntity<?> deleteReservation(@PathVariable ObjectId id, @PathVariable ObjectId reservationId) {
        try {
            User updatedUser = userService.deleteReservation(id, reservationId);
            return ResponseEntity.ok(updatedUser);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
    @DeleteMapping("/reservations/{reservationId}")
    public ResponseEntity<?> deleteReservationWithoutUserId(@PathVariable ObjectId reservationId) {
        try {
            User owner = null;
            for (User user : userService.getAllUsers()) {
                if (user.getReservations().stream().anyMatch(r -> r.getId().equals(reservationId))) {
                    owner = user;
                    break;
                }
            }

            if (owner == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Reservation not found");
            }

            userService.deleteReservation(owner.getId(), reservationId);
            return ResponseEntity.ok("Reservation deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
    @PutMapping("/{id}/reservations/{reservationId}")
    public ResponseEntity<?> updateReservation(@PathVariable ObjectId id, @PathVariable ObjectId reservationId, @RequestBody Reservation reservation) {
        try {
            Reservation updatedReservation = userService.updateReservation(id, reservationId, reservation);

            return ResponseEntity.ok(updatedReservation);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
    @GetMapping("/{userId}/reservations")
    public ResponseEntity<?> getAllReservations(@PathVariable ObjectId userId) {
        Optional<User> user = userService.getUserById(userId);
        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
        List<Reservation> reservations = user.get().getReservations();
        if (reservations.isEmpty()) {
            return ResponseEntity.ok("No reservations found");
        }
        return ResponseEntity.ok(reservations);
    }

    @GetMapping("/{userId}/reservations/{reservationId}")
    public ResponseEntity<?> getReservationById(@PathVariable ObjectId userId, @PathVariable ObjectId reservationId) {
        Optional<User> userOptional = userService.getUserById(userId);
        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        User user = userOptional.get();
        Reservation foundReservation = user.getReservations().stream()
                .filter(reservation -> reservation.getId().equals(reservationId))
                .findFirst()
                .orElse(null);

        if (foundReservation == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Reservation not found for the given user");
        }

        return ResponseEntity.ok(foundReservation);
    }

    @PostMapping("/{userId}/pay")
    public ResponseEntity<?> makePayment(@PathVariable ObjectId userId, @RequestBody PaymentDetails paymentDetails) {
        boolean paymentAuthorized = mockBankService.authorizePayment(paymentDetails.getCreditCardNumber(), paymentDetails.getAmount());
        if (paymentAuthorized) {
            return ResponseEntity.ok("Payment successful");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Payment authorization failed");
        }
    }
    @PostMapping("/{userId}/refund")
    public ResponseEntity<?> processRefund(@PathVariable ObjectId userId, @RequestBody PaymentDetails paymentDetails) {
        boolean refundProcessed = mockBankService.processRefund(paymentDetails.getCreditCardNumber(), paymentDetails.getAmount());
        if (refundProcessed) {
            return ResponseEntity.ok("Refund processed successfully");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Refund processing failed");
        }
    }
    @PutMapping("/{userId}/updatePaymentMethod")
    public ResponseEntity<?> updatePaymentMethod(@PathVariable ObjectId userId, @RequestBody PaymentDetails paymentDetails) {
        try {
            User updatedUser = userService.updatePaymentMethod(userId, paymentDetails);
            return ResponseEntity.ok(updatedUser);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PostMapping( "/{userId}/mailConfirmation/{reservationId}")
    public ResponseEntity<?> sendConfirmationMail(@PathVariable ObjectId userId,@PathVariable ObjectId reservationId) throws Exception
    {
    	Optional<User> user = userService.getUserById(userId);
        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new Exception("Reservation not found"));
    	
    	Car car = carService.getCarById(reservation.getCar().getId())
                .orElseThrow(() -> new Exception("Car not found"));
    	
    	try {
    		emailSender.sendMail("userbala2sm@outlook.com", "Car Rental Agreement", "This email is sent to confirm that you reserved a car with Bala2sm");//user.get().getEmail() and change body
    		return ResponseEntity.status(HttpStatus.OK).body("Email sent successfully");
    	}
    	catch (Exception e){
    		 return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
    	}
    }
    @PostMapping( "/{userId}/mailContract/{reservationId}")
    public ResponseEntity<?> sendMail(@PathVariable ObjectId userId, @PathVariable ObjectId reservationId) throws Exception {
    	
    	
    	Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new Exception("Reservation not found"));
    	Car car = carService.getCarById(reservation.getCar().getId())
                .orElseThrow(() -> new Exception("Car not found"));
    	Optional<User> user = userService.getUserById(userId);
        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
        
        
    	String renter="Name: " + user.get().getName() + "\n" +
		           "Address: " + reservation.getUserAddress()+ "\n" +
		           "Contact Number: " + reservation.getPhoneNumber() + "\n" +
		           "Email Address: " +user.get().getEmail()+ "\n" +
		           "Driver's License Number: " + reservation.getDriverLicense() + "\n";
    	
    	String rental=
    			"Rental Start Date: "+ reservation.getPickupDate()+"\n"
				+ "Rental End Date: "+reservation.getDropDate()+"\n"
				+ "Pick-up Location: "+car.getBranch().getAddress()+"\n"
				+ "Drop-off Location: "+car.getBranch().getAddress()+"\n"
				+ "Rental Period: "+reservation.getPickupDate().until(reservation.getDropDate()).getDays()+" days\n"
				+ "Mileage Limit (if applicable): "+car.getMilage()+" \n"
				+ "Rental Rate: "+car.getPrice()+" $ \n"
				+ "Additional Services (if any): cleaning (price : "+reservation.getCleaningPrice()+" $) and insurance (price: "+reservation.getInsurancePrice()+" $)\n";
    	
    	
    	String carInfo= 
    			"Make: "+car.getName()+"\n"
				+ "Model: "+car.getModel()+"\n"
				+ "Year: "+car.getYear()+"\n"
				+ "License Plate Number: "+car.getPlateNum()+"\n"
				+ "Vehicle Identification Number (VIN): "+car.getVin()+"\n"
				+ "Color: "+car.getColor()+"\n";
    	String mail="Car Rental Agreement\n"
				+ "\n"
				+ "Rental Agreement Number: "+reservation.getId()+"\n"
				+ "\n"
				+ "This Rental Agreement (\"Agreement\") is entered into between bala2sm, located at "+car.getBranch().getAddress()+", hereinafter referred to as the \"Rental Company,\" and the individual or entity identified below, hereinafter referred to as the \"Renter\":\n"
				+ "\n"
				+ "1. Renter's Information:\n"
				+ "\n"
				+ renter
				+ "\n"
				+ "2. Vehicle Information:\n"
				+carInfo
				+ "\n"
				+ "3. Rental Details:\n"
				+ "\n"
				+
				rental
				+ "\n"
				+ "4. Rental Terms and Conditions:\n"
				+ "\n"
				+ "The Renter acknowledges receiving the vehicle described above in good condition and agrees to return it to the Rental Company in the same condition, subject to normal wear and tear.\n"
				+ "\n"
				+ "The Renter agrees to use the vehicle solely for personal or business purposes and not for any illegal activities.\n"
				+ "\n"
				+ "The Renter agrees to pay the Rental Company the agreed-upon rental rate for the specified rental period. Additional charges may apply for exceeding the mileage limit, late returns, fuel refueling, or other damages.\n"
				+ "\n"
				+ "The Renter agrees to bear all costs associated with traffic violations, tolls, and parking fines incurred during the rental period.\n"
				+ "\n"
				+ "The Renter acknowledges that they are responsible for any loss or damage to the vehicle, including theft, vandalism, accidents, or negligence, and agrees to reimburse the Rental Company for all repair or replacement costs.\n"
				+ "\n"
				+ "The Renter agrees to return the vehicle to the designated drop-off location at the agreed-upon date and time. Failure to do so may result in additional charges.\n"
				+ "\n"
				+ "The Rental Company reserves the right to terminate this agreement and repossess the vehicle without prior notice if the Renter breaches any terms or conditions of this agreement.\n"
				+ "\n"
				+ "The Renter acknowledges receiving and reviewing a copy of the vehicle's insurance coverage and agrees to comply with all insurance requirements during the rental period.\n"
				+ "\n"
				+ "5. Indemnification:\n"
				+ "\n"
				+ "The Renter agrees to indemnify and hold harmless the Rental Company, its employees, agents, and affiliates from any claims, liabilities, damages, or expenses arising out of or related to the Renter's use of the vehicle.\n"
				+ "\n"
				+ "6. Governing Law:\n"
				+ "\n"
				+ "This Agreement shall be governed by and construed in accordance with the laws of [Jurisdiction]. Any disputes arising under or related to this Agreement shall be resolved exclusively by the courts of [Jurisdiction].\n"
				+ "\n"
				+ "7. Entire Agreement:\n"
				+ "\n"
				+ "This Agreement constitutes the entire understanding between the parties concerning the subject matter hereof and supersedes all prior agreements and understandings, whether written or oral.\n"
				+ "\n"
				+ "8. Signatures:\n"
				+ "\n"
				+ "The parties hereto have executed this Agreement as of the date first written above.\n"
				+ "\n"
				+ "Rental Company:\n"
				+ "\n"
				+ "Signature: ___________________________\n"
				+ "\n"
				+ "Print Name: __________________________\n"
				+ "\n"
				+ "Date: _______________________________\n"
				+ "\n"
				+ "Renter:\n"
				+ "\n"
				+ "Signature: ___________________________\n"
				+ "\n"
				+ "Print Name: __________________________\n"
				+ "\n"
				+ "Date: _______________________________\n"
				+ "\n";
    	try {
    		emailSender.sendMail("userbala2sm@outlook.com", "Car Rental Agreement", mail);//user.get().getEmail()
    		return ResponseEntity.status(HttpStatus.OK).body(mail);
    	}
    	catch (Exception e){
    		 return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
    	}
    }

}