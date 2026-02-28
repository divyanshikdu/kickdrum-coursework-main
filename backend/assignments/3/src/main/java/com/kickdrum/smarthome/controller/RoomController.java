package com.kickdrum.smarthome.controller;

import com.kickdrum.smarthome.dto.request.CreateRoomRequest;
import com.kickdrum.smarthome.dto.response.RoomResponse;
import com.kickdrum.smarthome.dto.response.RoomWithDevicesResponse;
import com.kickdrum.smarthome.entity.Room;
import com.kickdrum.smarthome.entity.User;
import com.kickdrum.smarthome.service.CurrentUserService;
import com.kickdrum.smarthome.service.RoomService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/houses/{houseId}/rooms")
public class RoomController {

    private final RoomService roomService;
    private final CurrentUserService currentUserService;

    public RoomController(RoomService roomService,
                          CurrentUserService currentUserService) {
        this.roomService = roomService;
        this.currentUserService = currentUserService;
    }

    @PostMapping
    public Room createRoom(@PathVariable Long houseId,
                           @RequestBody CreateRoomRequest request) {

        User currentUser = currentUserService.getCurrentUser();

        return roomService.createRoom(houseId, request, currentUser);
    }
    //room list endpoint response dto convert
    @GetMapping
    public List<RoomResponse> getRooms(@PathVariable Long houseId) {

        return roomService.getRooms(houseId)
                .stream()
                .map(RoomResponse::new)
                .toList();
    }
    // room with all devices
    @GetMapping("/with-devices")
    public List<RoomWithDevicesResponse> getRoomsWithDevices(
            @PathVariable Long houseId) {

        User currentUser = currentUserService.getCurrentUser();

        return roomService.getRoomsWithDevices(houseId, currentUser);
    }



}
