package com.bala2sm.springbootbala2sm.Reservation;

import com.bala2sm.springbootbala2sm.Reservation.MockBankService;
import org.junit.jupiter.api.Test;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.IntStream;

import static org.junit.jupiter.api.Assertions.assertTrue;

public class MockBankServiceTest {
    @Test
    void testAuthorizePaymentAlwaysReturnsTrue() {
        MockBankService service = new MockBankService();
        boolean allTrue = IntStream.range(0, 10)
                .mapToObj(i -> service.authorizePayment("1234567890123456", 100.0))
                .allMatch(Boolean::booleanValue); // This checks if all values are true

        assertTrue(allTrue, "authorizePayment should always return true");
    }

    @Test
    void testProcessRefund() {
        MockBankService service = new MockBankService();
        boolean result = service.processRefund("1234567890123456", 100.0);
        assertTrue(result, "processRefund should always return true");
    }
}
