package com.kickdrum.smarthome.dto.request;

import jakarta.validation.constraints.NotNull;

public class AddUserToHouseRequest {

    @NotNull
    private Long userId;

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
