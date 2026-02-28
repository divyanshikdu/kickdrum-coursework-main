package com.kickdrum.smarthome.entity;

import jakarta.persistence.*;

@Entity
@Table(name="devices")
public class Device extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String type;

    private boolean status;

    @ManyToOne
    @JoinColumn(name = "house_id", nullable = false)
    private House house;
    public void setStatus(Boolean status) {
        this.status = status;
    }
    public void setName(String name) {
        this.name = name;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setHouse(House house) {
        this.house = house;
    }
    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getType() {
        return type;
    }

    public Boolean getStatus() {
        return status;
    }

    public House getHouse() {
        return house;
    }
    public boolean isStatus() {
        return status;
    }
//room field in device
@ManyToOne
@JoinColumn(name = "room_id")
private Room room;

    public Room getRoom() {
        return room;
    }

    public void setRoom(Room room) {
        this.room = room;
    }



}
