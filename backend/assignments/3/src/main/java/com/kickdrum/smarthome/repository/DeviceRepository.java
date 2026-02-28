package com.kickdrum.smarthome.repository;

import com.kickdrum.smarthome.entity.Device;
import com.kickdrum.smarthome.entity.House;
import com.kickdrum.smarthome.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface DeviceRepository extends JpaRepository<Device, Long> {
    List<Device> findByHouse(House house);
    List<Device> findByRoom(Room room);

}
