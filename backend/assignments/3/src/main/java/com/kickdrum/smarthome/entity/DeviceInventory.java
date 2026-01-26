package com.kickdrum.smarthome.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "device_inventory")
public class DeviceInventory {

    @Id
    @Column(name = "kickston_id", length = 6)
    private String kickstonId;

    @Column(nullable = false)
    private String deviceUsername;

    @Column(nullable = false)
    private String devicePassword;

    private LocalDateTime manufactureDateTime;

    private String manufactureFactoryPlace;

    @Column(nullable = false)
    private boolean registered = false;

    public String getKickstonId() {
        return kickstonId;
    }

    public String getDeviceUsername() {
        return deviceUsername;
    }

    public String getDevicePassword() {
        return devicePassword;
    }

    public boolean isRegistered() {
        return registered;
    }

    public void setRegistered(boolean registered) {
        this.registered = registered;
    }
}
