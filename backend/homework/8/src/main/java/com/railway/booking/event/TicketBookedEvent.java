package com.railway.booking.event;

public class TicketBookedEvent {

    private String bookingId;
    private String trainId;
    private String seatNo;
    private String phoneNumber;
    private int age;


    public TicketBookedEvent(
            String bookingId,
            String trainId,
            String seatNo,
            String phoneNumber,
            int age) {

        this.bookingId = bookingId;
        this.trainId = trainId;
        this.seatNo = seatNo;
        this.phoneNumber = phoneNumber;
        this.age = age;
    }

    public String getBookingId() {
        return bookingId;
    }
    public int getAge() {
        return age;
    }


    public String getTrainId() {
        return trainId;
    }

    public String getSeatNo() {
        return seatNo;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }
}
