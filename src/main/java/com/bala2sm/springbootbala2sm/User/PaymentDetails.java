package com.bala2sm.springbootbala2sm.User;

public class PaymentDetails {
    private String creditCardNumber;
    private double amount;

    public PaymentDetails(String creditCardNumber, double amount) {
        this.creditCardNumber = creditCardNumber;
        this.amount = amount;
    }

    public PaymentDetails() {

    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public String getCreditCardNumber() {
        return creditCardNumber;
    }

    public void setCreditCardNumber(String creditCardNumber) {
        this.creditCardNumber = creditCardNumber;
    }
}
