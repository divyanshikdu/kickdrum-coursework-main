package com.railway.booking.event;

public class PaymentEvent {

    private String paymentId;
    private String bookingId;
    private int amount;

    public PaymentEvent(String paymentId, String bookingId, int amount) {
        this.paymentId = paymentId;
        this.bookingId = bookingId;
        this.amount = amount;
    }

    public String getPaymentId() {
        return paymentId;
    }

    public String getBookingId() {
        return bookingId;
    }

    public int getAmount() {
        return amount;
    }
}
