package com.bala2sm.springbootbala2sm.Reservation;

import com.bala2sm.springbootbala2sm.Reservation.MockBankService;
import org.junit.jupiter.api.Test;

import java.util.HashSet;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertTrue;

public class MockBankServiceTest {
    @Test
    void testAuthorizePayment() {
        MockBankService service = new MockBankService();
        Set<Boolean> results = new HashSet<>();
        for (int i = 0; i < 10; i++) {
            results.add(service.authorizePayment("1234567890123456", 100.0));
        }
        assertTrue(results.contains(true) && results.contains(false), "authorizePayment should return both true and false over multiple calls");
    }
    @Test
    void testProcessRefund() {
        MockBankService service = new MockBankService();
        boolean result = service.processRefund("1234567890123456", 100.0);
        assertTrue(result, "processRefund should always return true");
    }
}
