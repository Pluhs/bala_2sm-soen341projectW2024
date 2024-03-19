package com.bala2sm.springbootbala2sm;

import org.springframework.beans.factory.annotation.Autowired;
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
    public List<Branch> getAllBranches() {
        return branchService.findAll();
    }

    @GetMapping("/{id}")
    public Branch getBranchById(@PathVariable String id) {
        return branchService.findById(id);
    }

    @GetMapping("/search")
    public List<Branch> searchBranchesByAddress(@RequestParam String address) {
        return branchService.findByAddressContaining(address);
    }

}

