package com.quickship.backend.model;

public class Package {
    private String id;
    private String destination;
    private double weight;
    private String status;          //either pending or sorted
    private String deliveryType;  //either business or

    public String getId() {
        return id;
    }

    public String getDestination() {
        return destination;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public void setWeight(double weight) {
        this.weight = weight;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setDeliveryType(String deliveryType) {
        this.deliveryType = deliveryType;
    }

    public double getWeight() {
        return weight;
    }

    public String getStatus() {
        return status;
    }

    public String getDeliveryType() {
        return deliveryType;
    }
}
