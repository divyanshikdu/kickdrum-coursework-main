package com.kickdrum.smarthome.controller;

import com.kickdrum.smarthome.dto.request.RegisterRequest;
import com.kickdrum.smarthome.entity.User;
import com.kickdrum.smarthome.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import com.kickdrum.smarthome.dto.request.LoginRequest;
import com.kickdrum.smarthome.dto.response.LoginResponse;
import com.kickdrum.smarthome.dto.request.LoginRequest;
import com.kickdrum.smarthome.dto.response.LoginResponse;


@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public User register(@Valid @RequestBody RegisterRequest request) {
        return authService.register(request);
    }
    @PostMapping("/login")
    public LoginResponse login(@Valid @RequestBody LoginRequest request) {

        String token = authService.login(
                request.getEmail(),
                request.getPassword()
        );

        return new LoginResponse(token);
    }

}
