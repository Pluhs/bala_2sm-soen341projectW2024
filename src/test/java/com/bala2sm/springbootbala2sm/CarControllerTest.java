package com.bala2sm.springbootbala2sm;

import com.bala2sm.springbootbala2sm.Car;
import com.bala2sm.springbootbala2sm.CarController;
import com.bala2sm.springbootbala2sm.CarService;
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
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

@ExtendWith(MockitoExtension.class)
public class CarControllerTest {

    private MockMvc mockMvc;

    @Mock
    private CarService carService;

    @InjectMocks
    private CarController carController;

    @BeforeEach
    public void setup() {
        mockMvc = MockMvcBuilders.standaloneSetup(carController).build();    }
    @Test
    public void testGetAvailableCars() throws Exception {
        List<Car> mockCars = Arrays.asList(new Car(), new Car());
        when(carService.getAvailableCars()).thenReturn(mockCars);

        mockMvc.perform(MockMvcRequestBuilders.get("/cars/available")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)));
        verify(carService, times(1)).getAvailableCars();
    }
    @Test
    public void testGetAllCars() throws Exception {
        List<Car> mockCars = Arrays.asList(new Car(), new Car());
        when(carService.getAllCars()).thenReturn(mockCars);

        mockMvc.perform(MockMvcRequestBuilders.get("/cars")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)));
        verify(carService, times(1)).getAllCars();
    }
    @Test
    public void testAddCar() throws Exception {
        Car mockCar = new Car();
        mockCar.setPrice(10000.00);
        when(carService.addCar(any(Car.class))).thenReturn(mockCar);

        mockMvc.perform(MockMvcRequestBuilders.post("/cars")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJsonString(mockCar)))
                .andExpect(status().isOk())
                .andDo(print());
        verify(carService, times(1)).addCar(any(Car.class));
    }
    @Test
    public void testGetCarByIdFound() throws Exception {
        ObjectId mockId = new ObjectId();
        Car mockCar = new Car();
        when(carService.getCarById(mockId)).thenReturn(Optional.of(mockCar));

        mockMvc.perform(MockMvcRequestBuilders.get("/cars/" + mockId.toHexString())
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
        verify(carService, times(1)).getCarById(mockId);
    }
    @Test
    public void testGetCarByIdNotFound() throws Exception {
        ObjectId mockId = new ObjectId();
        when(carService.getCarById(mockId)).thenReturn(Optional.empty());

        mockMvc.perform(MockMvcRequestBuilders.get("/cars/" + mockId.toHexString())
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());
        verify(carService, times(1)).getCarById(mockId);
    }
    @Test
    public void testUpdateCar() throws Exception {
        ObjectId mockId = new ObjectId();
        Car mockCar = new Car();
        mockCar.setPrice(10000.00);

        when(carService.updateCar(eq(mockId), any(Car.class))).thenReturn(mockCar);

        mockMvc.perform(MockMvcRequestBuilders.put("/cars/" + mockId.toHexString())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJsonString(mockCar)))
                .andExpect(status().isOk());
        verify(carService, times(1)).updateCar(eq(mockId), any(Car.class));
    }
    @Test
    public void testDeleteCar() throws Exception {
        ObjectId mockId = new ObjectId();
        doNothing().when(carService).deleteCar(mockId);

        mockMvc.perform(MockMvcRequestBuilders.delete("/cars/" + mockId.toHexString())
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
        verify(carService, times(1)).deleteCar(mockId);
    }
    private String asJsonString(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
    @Test
    void testInspectCar() {
        ObjectId id = new ObjectId();
        ArrayList<String> damages = new ArrayList<>();
        damages.add("Scratch on door");
        Car expectedCar = new Car();
        expectedCar.setId(id);
        expectedCar.setDamages(damages);

        when(carService.inspectCar(any(ObjectId.class), any(ArrayList.class))).thenReturn(Optional.of(expectedCar));
        ResponseEntity<Car> response = carController.inspectCar(id, damages);

        assertEquals(HttpStatus.OK, response.getStatusCode(), "Status code should be OK");
        assertEquals(expectedCar, response.getBody(), "Response body should match expected car");
        verify(carService).inspectCar(eq(id), eq(damages));
    }
}
