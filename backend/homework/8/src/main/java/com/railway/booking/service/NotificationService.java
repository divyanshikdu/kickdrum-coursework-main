package com.railway.booking.service;

import com.railway.booking.broker.InMemoryEventQueue;
import com.railway.booking.event.TicketBookedEvent;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationService {

    public void sendNotifications() {

        List<TicketBookedEvent> events =
                InMemoryEventQueue.getTicketEvents();

        for (TicketBookedEvent event : events) {
            System.out.println(
                    "SMS sent for bookingId: " + event.getBookingId()
            );
        }
    }
}
