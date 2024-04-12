package com.bala2sm.springbootbala2sm.Branch;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class BranchServiceTest {

    @Mock
    private BranchRepository branchRepository;

    @InjectMocks
    private BranchService branchService;

    @Test
    void findAll_ShouldReturnAllBranches() {
        List<Branch> expectedBranches = Arrays.asList(
                new Branch(null, "123 Main St", -34.9285, 138.6007),
                new Branch(null, "456 Elm St", -35.0000, 139.0000)
        );
        when(branchRepository.findAll()).thenReturn(expectedBranches);

        List<Branch> actualBranches = branchService.findAll();

        assertEquals(expectedBranches, actualBranches);
        verify(branchRepository).findAll();
    }

    @Test
    void findById_ShouldReturnBranchWhenFound() {
        Branch expectedBranch = new Branch(null, "123 Main St", -34.9285, 138.6007);
        when(branchRepository.findById("someId")).thenReturn(Optional.of(expectedBranch));

        Branch actualBranch = branchService.findById("someId");

        assertEquals(expectedBranch, actualBranch);
        verify(branchRepository).findById("someId");
    }

    @Test
    void findById_ShouldReturnNullWhenNotFound() {
        when(branchRepository.findById("nonexistentId")).thenReturn(Optional.empty());

        Branch actualBranch = branchService.findById("nonexistentId");

        assertEquals(null, actualBranch);
        verify(branchRepository).findById("nonexistentId");
    }
}
