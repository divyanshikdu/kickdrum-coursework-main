package com.eventsphere.controller;

import com.eventsphere.entity.Booking;
import com.eventsphere.service.BookingService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/bookings")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PostMapping
    public Booking bookEvent(@RequestBody Map<String, Integer> request) {

        Long userId = request.get("userId").longValue();
        Long eventId = request.get("eventId").longValue();
        int seats = request.get("seats");

        return bookingService.bookEvent(userId, eventId, seats);
    }
}
