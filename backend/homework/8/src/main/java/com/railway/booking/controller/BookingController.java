package com.railway.booking.controller;

import com.railway.booking.service.BookingService;
import com.railway.booking.service.InventoryService;
import com.railway.booking.service.NotificationService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BookingController {

    private final BookingService bookingService;
    private final InventoryService inventoryService;
    private final NotificationService notificationService;

    public BookingController(BookingService bookingService,
                             InventoryService inventoryService,
                             NotificationService notificationService) {
        this.bookingService = bookingService;
        this.inventoryService = inventoryService;
        this.notificationService = notificationService;
    }

    @GetMapping("/book")
    public String bookTicket() {

        String response = bookingService.bookTicket();

        inventoryService.processInventory();
        notificationService.sendNotifications();

        return response;
    }
}
