package com.kickdrum.smarthome.repository;

import com.kickdrum.smarthome.entity.House;
import com.kickdrum.smarthome.entity.HouseUser;
import com.kickdrum.smarthome.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HouseUserRepository extends JpaRepository<HouseUser, Long> {

    List<HouseUser> findByHouse(House house);
    boolean existsByHouseAndUser(House house, User user);
    List<HouseUser> findByUserAndDeletedDateIsNull(User user);



}
