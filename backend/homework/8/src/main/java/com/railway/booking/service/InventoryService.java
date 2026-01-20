package com.railway.booking.service;

import com.railway.booking.broker.InMemoryEventQueue;
import com.railway.booking.dlq.DeadLetterQueue;
import com.railway.booking.event.TicketBookedEvent;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InventoryService {

    public void processInventory() {

        List<TicketBookedEvent> events =
                InMemoryEventQueue.getTicketEvents();

        for (TicketBookedEvent event : events) {
            processWithRetry(event);
        }
    }

    private void processWithRetry(TicketBookedEvent event) {

        int maxRetries = 3;
        int attempt = 0;

        while (attempt < maxRetries) {
            try {
                attempt++;

                // Corrupt / poison pill message
                if (event.getAge() < 0) {
                    throw new RuntimeException("Corrupt message: invalid age");
                }

                System.out.println(
                        "Inventory updated successfully for bookingId: "
                                + event.getBookingId()
                );
                return;

            } catch (Exception e) {
                System.out.println(
                        "Retry " + attempt
                                + " failed for bookingId: "
                                + event.getBookingId()
                );

                try {
                    Thread.sleep(1000); // short delay
                } catch (InterruptedException ex) {
                    Thread.currentThread().interrupt();
                }
            }
        }

        // After 3 failed attempts → DLQ
        DeadLetterQueue.sendToDLQ(event);
    }
}
