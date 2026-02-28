package com.kickdrum.smarthome.service;

import com.kickdrum.smarthome.dto.request.DeviceRequest;
import com.kickdrum.smarthome.entity.*;
import com.kickdrum.smarthome.exception.custom.ResourceNotFoundException;
import com.kickdrum.smarthome.repository.*;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import com.kickdrum.smarthome.exception.custom.AccessDeniedException;


@Service
public class DeviceService {

    private final DeviceRepository deviceRepository;
    private final HouseRepository houseRepository;
    private final HouseUserRepository houseUserRepository;
    private final RoomRepository roomRepository;
    private final DeviceInventoryRepository inventoryRepository;




    public DeviceService(DeviceRepository deviceRepository,
                         HouseRepository houseRepository,
                         HouseUserRepository houseUserRepository,
                         RoomRepository roomRepository,
                         DeviceInventoryRepository inventoryRepository) {
        this.deviceRepository = deviceRepository;
        this.houseRepository = houseRepository;
        this.houseUserRepository = houseUserRepository;
        this.roomRepository = roomRepository;
        this.inventoryRepository = inventoryRepository;
    }


    public void addDevice(Long houseId, DeviceRequest request, User currentUser) {

        House house = houseRepository.findById(houseId)
                .orElseThrow(() -> new ResourceNotFoundException("House not found"));

        if (!house.getAdmin().getId().equals(currentUser.getId())) {
            throw new AccessDeniedException("Only admin can add devices");
        }

        DeviceInventory inventory = inventoryRepository.findById(request.getKickstonId())
                .orElseThrow(() -> new ResourceNotFoundException("Device not found in inventory"));

        if (!inventory.getDeviceUsername().equals(request.getDeviceUsername()) ||
                !inventory.getDevicePassword().equals(request.getDevicePassword())) {

            throw new AccessDeniedException("Invalid device credentials");
        }

        if (inventory.isRegistered()) {
            throw new AccessDeniedException("Device already registered to another house");
        }

        Device device = new Device();
        device.setName(request.getName());
        device.setType(request.getType());
        device.setStatus(false);
        device.setHouse(house);

        deviceRepository.save(device);

        inventory.setRegistered(true);
        inventoryRepository.save(inventory);
    }
    public List<Device> getDevicesByHouse(Long houseId, User currentUser) {

        House house = houseRepository.findById(houseId)
                .orElseThrow(() -> new ResourceNotFoundException("House not found"));

        boolean isMember =
                houseUserRepository.existsByHouseAndUser(house, currentUser);

        if (!isMember) {
            throw new AccessDeniedException("You are not a member of this house");
        }

        return deviceRepository.findByHouse(house);
    }

    //toggle devices on or off
    public void toggleDevice(Long houseId, Long deviceId, User currentUser) {

        House house = houseRepository.findById(houseId)
                .orElseThrow(() -> new ResourceNotFoundException("House not found"));

        if (!house.getAdmin().getId().equals(currentUser.getId())) {
            throw new AccessDeniedException("Only admin can toggle device");
        }

        Device device = deviceRepository.findById(deviceId)
                .orElseThrow(() -> new ResourceNotFoundException("Device not found"));

        if (!device.getHouse().getId().equals(houseId)) {
            throw new ResourceNotFoundException("Device does not belong to this house");
        }

        device.setStatus(!device.isStatus());

        deviceRepository.save(device);
    }

    //soft delete
    public void deleteDevice(Long houseId, Long deviceId, User currentUser) {

        House house = houseRepository.findById(houseId)
                .orElseThrow(() -> new ResourceNotFoundException("House not found"));

        if (!house.getAdmin().getId().equals(currentUser.getId())) {
            throw new AccessDeniedException("Only admin can delete devices");
        }

        Device device = deviceRepository.findById(deviceId)
                .orElseThrow(() -> new ResourceNotFoundException("Device not found"));

        device.setDeletedDate(LocalDateTime.now());

        deviceRepository.save(device);
    }

    //add asign method for room
    public void assignDeviceToRoom(Long houseId, Long roomId, Long deviceId, User currentUser) {

        House house = houseRepository.findById(houseId)
                .orElseThrow(() -> new ResourceNotFoundException("House not found"));

        if (!house.getAdmin().getId().equals(currentUser.getId())) {
            throw new AccessDeniedException("Only admin can assign device");
        }

        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new ResourceNotFoundException("Room not found"));

        Device device = deviceRepository.findById(deviceId)
                .orElseThrow(() -> new ResourceNotFoundException("Device not found"));

        device.setRoom(room);

        deviceRepository.save(device);
    }
    public List<Device> getDevicesOfRoom(Long houseId, Long roomId, User currentUser) {

        House house = houseRepository.findById(houseId)
                .orElseThrow(() -> new ResourceNotFoundException("House not found"));

        boolean isMember =
                houseUserRepository.existsByHouseAndUser(house, currentUser);

        if (!isMember) {
            throw new AccessDeniedException("You are not a member of this house");
        }

        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new ResourceNotFoundException("Room not found"));

        return deviceRepository.findByRoom(room);
    }
    //move device to another room
    public void moveDeviceToRoom(Long houseId,
                                 Long deviceId,
                                 Long newRoomId,
                                 User currentUser) {

        House house = houseRepository.findById(houseId)
                .orElseThrow(() -> new ResourceNotFoundException("House not found"));

        if (!house.getAdmin().getId().equals(currentUser.getId())) {
            throw new AccessDeniedException("Only admin can move devices");
        }

        Device device = deviceRepository.findById(deviceId)
                .orElseThrow(() -> new ResourceNotFoundException("Device not found"));

        if (!device.getHouse().getId().equals(houseId)) {
            throw new ResourceNotFoundException("Device does not belong to this house");
        }

        Room newRoom = roomRepository.findById(newRoomId)
                .orElseThrow(() -> new ResourceNotFoundException("Room not found"));

        if (!newRoom.getHouse().getId().equals(houseId)) {
            throw new ResourceNotFoundException("Room does not belong to this house");
        }

        device.setRoom(newRoom);

        deviceRepository.save(device);
    }






}
