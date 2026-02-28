package com.kickdrum.smarthome.controller;

import com.kickdrum.smarthome.dto.request.CreateHouseRequest;
import com.kickdrum.smarthome.dto.request.UpdateAddressRequest;
import com.kickdrum.smarthome.entity.House;
import com.kickdrum.smarthome.entity.User;
import com.kickdrum.smarthome.service.CurrentUserService;
import com.kickdrum.smarthome.service.HouseService;
import java.util.*;
import com.kickdrum.smarthome.entity.HouseUser;
import com.kickdrum.smarthome.service.HouseService;
import com.kickdrum.smarthome.dto.response.HouseUserResponse;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import com.kickdrum.smarthome.dto.request.AddUserToHouseRequest;

@RestController
@RequestMapping("/houses")
public class HouseController {

    private final HouseService houseService;
    private final CurrentUserService currentUserService;

    public HouseController(HouseService houseService,
                           CurrentUserService currentUserService) {
        this.houseService = houseService;
        this.currentUserService = currentUserService;
    }

    @PostMapping
    public House createHouse(@Valid @RequestBody CreateHouseRequest request) {
// which user send the request
        User currentUser = currentUserService.getCurrentUser();

        return houseService.createHouse(request, currentUser);
    }
    @PostMapping("/{houseId}/users")
    public String addUserToHouse(
            @PathVariable Long houseId,
            @RequestBody AddUserToHouseRequest request
    ) {
        User currentUser = currentUserService.getCurrentUser();

        houseService.addUserToHouse(
                houseId,
                request.getUserId(),
                currentUser
        );

        return "User added successfully";
    }
    //get the users of a house
    @GetMapping("/{houseId}/users")
    public List<HouseUserResponse> getUsersOfHouse(@PathVariable Long houseId) {

        return houseService.getUsersOfHouse(houseId);


    }
// adding /houses endpoint
@GetMapping
public List<House> getMyHouses() {

    User currentUser = currentUserService.getCurrentUser();

    return houseService.getMyHouses(currentUser);
}
// put address endpoint
@PutMapping("/{houseId}/address")
public House updateAddress(@PathVariable Long houseId,
                           @RequestBody UpdateAddressRequest request) {

    User currentUser = currentUserService.getCurrentUser();

    return houseService.updateAddress(houseId, request, currentUser);
}
//transfer endpoint
@PutMapping("/{houseId}/transfer/{userId}")
public House transferOwnership(@PathVariable Long houseId,
                               @PathVariable Long userId) {

    User currentUser = currentUserService.getCurrentUser();

    return houseService.transferOwnership(houseId, userId, currentUser);
}



}
