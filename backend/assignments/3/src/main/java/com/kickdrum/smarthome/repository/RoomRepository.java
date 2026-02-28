package com.kickdrum.smarthome.repository;

import com.kickdrum.smarthome.entity.Room;
import com.kickdrum.smarthome.entity.House;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RoomRepository extends JpaRepository<Room, Long> {

    List<Room> findByHouseAndDeletedDateIsNull(House house);
}
