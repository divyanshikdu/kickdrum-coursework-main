package com.kickdrum.smarthome.dto.response;

import com.kickdrum.smarthome.entity.Room;

public class RoomResponse {

    private Long id;
    private String name;

    public RoomResponse(Room room) {
        this.id = room.getId();
        this.name = room.getName();
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }
}
