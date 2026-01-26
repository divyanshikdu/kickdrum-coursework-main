package com.kickdrum.smarthome.dto.response;

import com.kickdrum.smarthome.entity.Device;

public class DeviceResponse {

    private Long id;
    private String name;
    private String type;
    private boolean status;

    public DeviceResponse(Device device) {
        this.id = device.getId();
        this.name = device.getName();
        this.type = device.getType();
        this.status = device.isStatus();
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getType() { return type; }
    public boolean isStatus() { return status; }
}
