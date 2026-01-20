package com.railway.booking.service;

import com.railway.booking.broker.InMemoryEventQueue;
import com.railway.booking.event.PaymentEvent;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class PaymentService {

    private Set<String> processedPaymentIds = new HashSet<>();

    public void processPayments() {

        List<PaymentEvent> events = InMemoryEventQueue.getPaymentEvents();

        for (PaymentEvent event : events) {

            if (processedPaymentIds.contains(event.getPaymentId())) {
                System.out.println(
                        "Duplicate payment ignored: " + event.getPaymentId()
                );
                continue;
            }

            processedPaymentIds.add(event.getPaymentId());

            System.out.println(
                    "Money Deducted for bookingId: " + event.getBookingId()
            );
        }
    }
}
