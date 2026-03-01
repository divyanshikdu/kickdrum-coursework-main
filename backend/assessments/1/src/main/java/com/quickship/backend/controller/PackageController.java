package com.quickship.backend.controller;

import com.quickship.backend.model.Package;
import com.quickship.backend.service.PackageService;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;



@RestController
@RequestMapping("/api")
public class PackageController {

    private final PackageService packageService;

    public PackageController(PackageService packageService) {
        this.packageService = packageService;
    }


    @PreAuthorize("hasRole('MANAGER')")
    @PostMapping("/packages")
    public ResponseEntity<String> addPackage(@RequestBody Package pkg) {
        try {
            packageService.addPackage(pkg);
            return ResponseEntity.ok("Package accepted and scanning started");
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }
    @PreAuthorize("hasAnyRole('MANAGER','DRIVER')")
    @GetMapping("/analytics/revenue")
    public double getRevenue() {
        return packageService.calculateRevenue();
    }


}
