package com.railway.booking.broker;

import com.railway.booking.event.TicketBookedEvent;
import com.railway.booking.event.PaymentEvent;

import java.util.ArrayList;
import java.util.List;

public class InMemoryEventQueue {

    private static List<TicketBookedEvent> ticketEvents = new ArrayList<>();
    private static List<PaymentEvent> paymentEvents = new ArrayList<>();

    public static void publishTicket(TicketBookedEvent event) {
        ticketEvents.add(event);
        System.out.println("Ticket event added: " + event.getBookingId());
    }

    public static List<TicketBookedEvent> getTicketEvents() {
        return ticketEvents;
    }

    public static void publishPayment(PaymentEvent event) {
        paymentEvents.add(event);
        System.out.println("Payment event added: " + event.getPaymentId());
    }

    public static List<PaymentEvent> getPaymentEvents() {
        return paymentEvents;
    }
}
