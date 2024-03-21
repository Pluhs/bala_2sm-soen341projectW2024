package com.bala2sm.springbootbala2sm;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BranchRepository extends MongoRepository<Branch, String> {

}