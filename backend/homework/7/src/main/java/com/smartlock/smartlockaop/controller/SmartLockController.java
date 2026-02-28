package com.smartlock.smartlockaop.controller;

import com.smartlock.smartlockaop.dto.UserDto;
import com.smartlock.smartlockaop.service.SmartLockService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/lock")
public class SmartLockController {

    private final SmartLockService service;

    public SmartLockController(SmartLockService service) {
        this.service = service;
    }

    @PostMapping("/unlock")
    public String unlock(@RequestBody UserDto user) {
        service.unlock(user);
        return "Unlock request processed";
    }

    @GetMapping("/battery")
    public String checkBattery() {
        service.checkBattery();
        return "Battery checked";
    }
}
