package com.bala2sm.springbootbala2sm;

import com.bala2sm.springbootbala2sm.User.PaymentDetails;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class PaymentDetailsTest {
    @Test
    void testPaymentDetails() {
        String testCreditCardNumber = "1234567890123456";
        double testAmount = 100.0;

        PaymentDetails paymentDetails = new PaymentDetails();
        paymentDetails.setCreditCardNumber(testCreditCardNumber);
        paymentDetails.setAmount(testAmount);

        assertEquals(testCreditCardNumber, paymentDetails.getCreditCardNumber(), "Credit card number should match the set value");
        assertEquals(testAmount, paymentDetails.getAmount(), "Amount should match the set value");
    }
}
