package com.eventsphere.repository;

import com.eventsphere.entity.Reservation;
import com.eventsphere.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    List<Reservation> findByUser(User user);
}
