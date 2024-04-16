package com.bala2sm.springbootbala2sm.Branch;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.mockito.Mockito.*;

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

import java.util.Arrays;
import java.util.List;

@ExtendWith(MockitoExtension.class)
public class BranchControllerTest {
    private MockMvc mockMvc;
    private ObjectMapper objectMapper = new ObjectMapper();

    @Mock
    private BranchService branchService;

    @InjectMocks
    private BranchController branchController;

    @BeforeEach
    public void setup() {
        this.mockMvc = MockMvcBuilders.standaloneSetup(branchController).build();
    }

    @Test
    public void getAllBranches_ShouldReturnAllBranches() throws Exception {
        List<Branch> branches = Arrays.asList(
                new Branch(new ObjectId("507f1f77bcf86cd799439011"), "123 Main St", -34.9285, 138.6007),
                new Branch(new ObjectId("507f1f77bcf86cd799439012"), "456 Elm St", -35.0000, 139.0000)
        );

        when(branchService.findAll()).thenReturn(branches);

        mockMvc.perform(get("/branches"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(content().json(objectMapper.writeValueAsString(branches)));

        verify(branchService, times(1)).findAll();
    }

    @Test
    public void getBranchById_ShouldReturnBranch() throws Exception {
        ObjectId id = new ObjectId("507f1f77bcf86cd799439011");
        Branch branch = new Branch(id, "123 Main St", -34.9285, 138.6007);

        when(branchService.findById("507f1f77bcf86cd799439011")).thenReturn(branch);

        mockMvc.perform(get("/branches/{id}", "507f1f77bcf86cd799439011"))
                .andExpect(status().isOk())
                .andExpect(content().json(objectMapper.writeValueAsString(branch)));

        verify(branchService, times(1)).findById("507f1f77bcf86cd799439011");
    }

}
