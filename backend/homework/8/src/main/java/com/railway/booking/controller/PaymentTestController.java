package com.railway.booking.controller;

import com.railway.booking.broker.InMemoryEventQueue;
import com.railway.booking.event.PaymentEvent;
import com.railway.booking.service.PaymentService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PaymentTestController {

    private final PaymentService paymentService;

    public PaymentTestController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @GetMapping("/test-payment")
    public String testPayment() {

        PaymentEvent event =
                new PaymentEvent("P1001", "B123", 500);

        // SAME payment 3 times
        InMemoryEventQueue.publishPayment(event);
        InMemoryEventQueue.publishPayment(event);
        InMemoryEventQueue.publishPayment(event);

        // Process payments
        paymentService.processPayments();

        return "Payment test completed";
    }
}
