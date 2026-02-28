package com.kickdrum.smarthome.repository;

import com.kickdrum.smarthome.entity.House;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HouseRepository extends JpaRepository<House, Long> {
}
