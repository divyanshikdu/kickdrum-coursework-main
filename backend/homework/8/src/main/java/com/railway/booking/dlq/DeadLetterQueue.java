package com.railway.booking.dlq;

import com.railway.booking.event.TicketBookedEvent;

import java.util.ArrayList;
import java.util.List;

public class DeadLetterQueue {

    private static List<TicketBookedEvent> bookingErrorQueue = new ArrayList<>();

    public static void sendToDLQ(TicketBookedEvent event) {
        bookingErrorQueue.add(event);
        System.out.println(
                "[DLQ: booking-error-queue] Message moved for manual review. bookingId="
                        + event.getBookingId()
        );
    }

    public static List<TicketBookedEvent> getBookingErrorQueue() {
        return bookingErrorQueue;
    }
}
