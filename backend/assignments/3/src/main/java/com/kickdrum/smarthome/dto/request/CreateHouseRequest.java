package com.kickdrum.smarthome.dto.request;

import jakarta.validation.constraints.NotBlank;

public class CreateHouseRequest {

    @NotBlank
    private String name;

    private String address;

    public String getName() {
        return name;
    }

    public String getAddress() {
        return address;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}
