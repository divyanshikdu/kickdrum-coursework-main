package com.kickdrum.smarthome.service;

import com.kickdrum.smarthome.dto.request.CreateRoomRequest;
import com.kickdrum.smarthome.dto.response.DeviceResponse;
import com.kickdrum.smarthome.dto.response.RoomWithDevicesResponse;
import com.kickdrum.smarthome.entity.House;
import com.kickdrum.smarthome.entity.Room;
import com.kickdrum.smarthome.entity.User;
import com.kickdrum.smarthome.exception.custom.AccessDeniedException;
import com.kickdrum.smarthome.exception.custom.ResourceNotFoundException;
import com.kickdrum.smarthome.repository.DeviceRepository;
import com.kickdrum.smarthome.repository.HouseRepository;
import com.kickdrum.smarthome.repository.RoomRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoomService {

    private final RoomRepository roomRepository;
    private final HouseRepository houseRepository;
    private final DeviceRepository deviceRepository;


    public RoomService(RoomRepository roomRepository,
                       HouseRepository houseRepository,
                       DeviceRepository deviceRepository) {

        this.roomRepository = roomRepository;
        this.houseRepository = houseRepository;
        this.deviceRepository = deviceRepository;
    }


    public Room createRoom(Long houseId,
                           CreateRoomRequest request,
                           User currentUser) {

        House house = houseRepository.findById(houseId)
                .orElseThrow(() -> new ResourceNotFoundException("House not found"));

        if (!house.getAdmin().getId().equals(currentUser.getId())) {
            throw new AccessDeniedException("Only admin can create rooms");
        }

        Room room = new Room();
        room.setName(request.getName());
        room.setHouse(house);

        return roomRepository.save(room);
    }
    //get rooms
    public List<Room> getRooms(Long houseId) {

        House house = houseRepository.findById(houseId)
                .orElseThrow(() -> new ResourceNotFoundException("House not found"));

        return roomRepository.findByHouseAndDeletedDateIsNull(house);
    }

    public List<RoomWithDevicesResponse> getRoomsWithDevices(Long houseId,
                                                             User currentUser) {

        House house = houseRepository.findById(houseId)
                .orElseThrow(() -> new ResourceNotFoundException("House not found"));

        List<Room> rooms = roomRepository.findByHouseAndDeletedDateIsNull(house);

        return rooms.stream().map(room -> {

            List<DeviceResponse> devices =
                    deviceRepository.findByRoom(room)
                            .stream()
                            .map(DeviceResponse::new)
                            .toList();

            return new RoomWithDevicesResponse(room, devices);

        }).toList();
    }

}
