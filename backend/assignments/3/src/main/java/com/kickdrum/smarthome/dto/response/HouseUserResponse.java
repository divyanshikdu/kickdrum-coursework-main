package com.kickdrum.smarthome.dto.response;

import com.kickdrum.smarthome.entity.HouseRole;
import com.kickdrum.smarthome.entity.HouseUser;


public class HouseUserResponse {

    private Long userId;
    private String name;
    private String email;
    private HouseRole role;
    private Long id;

    public HouseUserResponse(HouseUser houseUser) {
        this.id = houseUser.getId();
        this.userId = houseUser.getUser().getId();
        this.name = houseUser.getUser().getName();
        this.email = houseUser.getUser().getEmail();
        this.role = houseUser.getRole();
    }


    public Long getUserId() {
        return userId;
    }
    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public HouseRole getRole() {
        return role;
    }
}
