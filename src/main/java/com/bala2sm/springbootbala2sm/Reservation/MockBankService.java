package com.bala2sm.springbootbala2sm.Reservation;

import org.springframework.stereotype.Service;

import java.util.Random;
@Service
public class MockBankService {

    public boolean authorizePayment(String creditCardNumber, double amount) {
        return true;
    }
    public boolean processRefund(String creditCardNumber, double amount) {
        return true;
    }
}
