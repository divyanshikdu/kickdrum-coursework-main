package com.kickdrum.smarthome.dto.request;

public class DeviceRequest {

    private String name;
    private String type;

    private String kickstonId;
    private String deviceUsername;
    private String devicePassword;

    public String getKickstonId() { return kickstonId; }
    public String getDeviceUsername() { return deviceUsername; }
    public String getDevicePassword() { return devicePassword; }

    public String getName() { return name; }
    public String getType() { return type; }
}
