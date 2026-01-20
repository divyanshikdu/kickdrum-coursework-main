package com.railway.booking.service;

import com.railway.booking.broker.InMemoryEventQueue;
import com.railway.booking.event.TicketBookedEvent;
import org.springframework.stereotype.Service;

@Service
public class BookingService {

    public String bookTicket() {

        // Corrupt / poison message
        TicketBookedEvent event =
                new TicketBookedEvent(
                        "B500",
                        "T77",
                        "S9",
                        "9999999999",
                        -10
                );

        InMemoryEventQueue.publishTicket(event);

        return "Booking in progress";
    }
}
