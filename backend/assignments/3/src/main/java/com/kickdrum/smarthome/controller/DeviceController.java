package com.kickdrum.smarthome.controller;

import com.kickdrum.smarthome.dto.request.DeviceRequest;
import com.kickdrum.smarthome.entity.User;
import com.kickdrum.smarthome.service.CurrentUserService;
import com.kickdrum.smarthome.service.DeviceService;
import org.springframework.web.bind.annotation.*;
import com.kickdrum.smarthome.dto.response.DeviceResponse;
import com.kickdrum.smarthome.entity.Device;

import java.util.List;



@RestController
@RequestMapping("/houses/{houseId}/devices")
public class DeviceController {

    private final DeviceService deviceService;

    public DeviceController(DeviceService deviceService,
                            CurrentUserService currentUserService) {
        this.deviceService = deviceService;
        this.currentUserService = currentUserService;
    }


    @PostMapping
    public String addDevice(@PathVariable Long houseId,
                            @RequestBody DeviceRequest request) {
        User currentUser = currentUserService.getCurrentUser();

        deviceService.addDevice(houseId, request,currentUser);
        return "Device added successfully";
    }
    private final CurrentUserService currentUserService;

    @GetMapping
    public List<DeviceResponse> getDevices(@PathVariable Long houseId) {

        User currentUser = currentUserService.getCurrentUser();

        return deviceService.getDevicesByHouse(houseId, currentUser)
                .stream()
                .map(DeviceResponse::new)
                .toList();
    }
    @PutMapping("/{deviceId}/toggle")
    public String toggleDevice(@PathVariable Long houseId,
                               @PathVariable Long deviceId) {

        User currentUser = currentUserService.getCurrentUser();

        deviceService.toggleDevice(houseId, deviceId, currentUser);

        return "Device toggled successfully";
    }
// delete api
    @DeleteMapping("/{deviceId}")
    public String deleteDevice(@PathVariable Long houseId,
                               @PathVariable Long deviceId) {

        User currentUser = currentUserService.getCurrentUser();

        deviceService.deleteDevice(houseId, deviceId, currentUser);

        return "Device deleted successfully";
    }
// room api
@PostMapping("/rooms/{roomId}/devices/{deviceId}")
public String assignDeviceToRoom(
        @PathVariable Long houseId,
        @PathVariable Long roomId,
        @PathVariable Long deviceId
) {
    User currentUser = currentUserService.getCurrentUser();

    deviceService.assignDeviceToRoom(houseId, roomId, deviceId, currentUser);

    return "Device assigned to room successfully";
}

    @GetMapping("/rooms/{roomId}/devices")
    public List<DeviceResponse> getDevicesOfRoom(
            @PathVariable Long houseId,
            @PathVariable Long roomId
    ) {
        User currentUser = currentUserService.getCurrentUser();

        return deviceService.getDevicesOfRoom(houseId, roomId, currentUser)
                .stream()
                .map(DeviceResponse::new)
                .toList();
    }

    //device move from one room to another
    @PutMapping("/{deviceId}/move/{roomId}")
    public String moveDeviceToRoom(@PathVariable Long houseId,
                                   @PathVariable Long deviceId,
                                   @PathVariable Long roomId) {

        User currentUser = currentUserService.getCurrentUser();

        deviceService.moveDeviceToRoom(houseId, deviceId, roomId, currentUser);

        return "Device moved successfully";
    }


}
