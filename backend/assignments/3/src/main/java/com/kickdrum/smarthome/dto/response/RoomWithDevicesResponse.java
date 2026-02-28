package com.kickdrum.smarthome.dto.response;

import com.kickdrum.smarthome.entity.Room;

import java.util.List;

public class RoomWithDevicesResponse {

    private Long roomId;
    private String roomName;
    private List<DeviceResponse> devices;

    public RoomWithDevicesResponse(Room room, List<DeviceResponse> devices) {
        this.roomId = room.getId();
        this.roomName = room.getName();
        this.devices = devices;
    }

    public Long getRoomId() { return roomId; }
    public String getRoomName() { return roomName; }
    public List<DeviceResponse> getDevices() { return devices; }
}
