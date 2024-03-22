package com.bala2sm.springbootbala2sm.Reservation;

import org.springframework.stereotype.Service;

import java.util.Random;
@Service
public class MockBankService {

    private Random random = new Random();
    public boolean authorizePayment(String creditCardNumber, double amount) {
        return random.nextBoolean();
    }
    public boolean processRefund(String creditCardNumber, double amount) {
        return true;
    }
}
