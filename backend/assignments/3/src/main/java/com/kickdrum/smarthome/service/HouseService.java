package com.kickdrum.smarthome.service;

import com.kickdrum.smarthome.dto.request.CreateHouseRequest;
import com.kickdrum.smarthome.dto.request.UpdateAddressRequest;
import com.kickdrum.smarthome.entity.House;
import com.kickdrum.smarthome.entity.HouseUser;
import com.kickdrum.smarthome.entity.User;
import com.kickdrum.smarthome.repository.HouseRepository;
import com.kickdrum.smarthome.repository.HouseUserRepository;
import org.springframework.stereotype.Service;
import com.kickdrum.smarthome.entity.HouseUser;
import com.kickdrum.smarthome.entity.HouseRole;
import com.kickdrum.smarthome.repository.UserRepository;
import com.kickdrum.smarthome.dto.response.HouseUserResponse;
import java.util.*;
import com.kickdrum.smarthome.exception.response.ErrorResponse;
import com.kickdrum.smarthome.exception.custom.AccessDeniedException;
import com.kickdrum.smarthome.exception.custom.ResourceNotFoundException;
import com.kickdrum.smarthome.exception.handler.GlobalExceptionHandler;
import com.kickdrum.smarthome.repository.HouseUserRepository;
@Service
public class HouseService {

    private final HouseRepository houseRepository;
    private final HouseUserRepository houseUserRepository;
    private final UserRepository userRepository;

    public HouseService(HouseRepository houseRepository,
                        HouseUserRepository houseUserRepository,
                        UserRepository userRepository) {
        this.houseRepository = houseRepository;
        this.houseUserRepository = houseUserRepository;
        this.userRepository = userRepository;
    }
//creating a new house
    public House createHouse(CreateHouseRequest request, User currentUser) {

        House house = new House();
        house.setName(request.getName());
        house.setAddress(request.getAddress());

        house.setAdmin(currentUser);

        House savedHouse = houseRepository.save(house);

        HouseUser mapping = new HouseUser();
        mapping.setHouse(savedHouse);
        mapping.setUser(currentUser);
        mapping.setRole(HouseRole.ADMIN);


        houseUserRepository.save(mapping);

        return savedHouse;
    }
    //add user to house
    public void addUserToHouse(Long houseId, Long userId, User currentUser) {

        House house = houseRepository.findById(houseId)
                .orElseThrow(() -> new ResourceNotFoundException("House not found"));

//admin check
        if (!house.getAdmin().getId().equals(currentUser.getId())) {
            throw new AccessDeniedException("Only admin can add users");
        }
//user exists check
        User userToAdd = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        HouseUser houseUser = new HouseUser();
        houseUser.setHouse(house);
        houseUser.setUser(userToAdd);
        houseUser.setRole(HouseRole.MEMBER);

        houseUserRepository.save(houseUser);
    }
    //get users of house
    public List<HouseUserResponse> getUsersOfHouse(Long houseId) {
        House house = houseRepository.findById(houseId)
                .orElseThrow(() -> new ResourceNotFoundException("House not found"));

        return houseUserRepository.findByHouse(house)
                .stream()
                .map(HouseUserResponse::new)   //HouseUser entity → HouseUserResponse DTO
                .toList();

    }
    //user get house list
    public List<House> getMyHouses(User currentUser) {

        List<HouseUser> mappings =
                houseUserRepository.findByUserAndDeletedDateIsNull(currentUser);

        return mappings.stream()
                .map(HouseUser::getHouse)
                .toList();
    }

// update address
public House updateAddress(Long houseId,
                           UpdateAddressRequest request,
                           User currentUser) {

    House house = houseRepository.findById(houseId)
            .orElseThrow(() -> new ResourceNotFoundException("House not found"));

    if (!house.getAdmin().getId().equals(currentUser.getId())) {
        throw new AccessDeniedException("Only admin can update address");
    }

    house.setAddress(request.getAddress());

    return houseRepository.save(house);
}
// admin transfer role
public House transferOwnership(Long houseId,
                               Long newAdminUserId,
                               User currentUser) {

    House house = houseRepository.findById(houseId)
            .orElseThrow(() -> new ResourceNotFoundException("House not found"));

    if (!house.getAdmin().getId().equals(currentUser.getId())) {
        throw new AccessDeniedException("Only admin can transfer ownership");
    }

    User newAdmin = userRepository.findById(newAdminUserId)
            .orElseThrow(() -> new ResourceNotFoundException("User not found"));

    house.setAdmin(newAdmin);

    return houseRepository.save(house);
}

}
