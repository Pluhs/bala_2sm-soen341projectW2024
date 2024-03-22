package com.bala2sm.springbootbala2sm.Branch;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/branches")
@CrossOrigin(origins = "http://localhost:3000")
public class BranchController {
    private final BranchService branchService;

    @Autowired
    public BranchController(BranchService branchService) {
        this.branchService = branchService;
    }

    @GetMapping
    public ResponseEntity<List<Branch>> getAllBranches() {
        List<Branch> branches = branchService.findAll();
        return ResponseEntity.ok(branches);
    }

    @GetMapping("/{id}")
    public Branch getBranchById(@PathVariable String id) {
        return branchService.findById(id);
    }

}

