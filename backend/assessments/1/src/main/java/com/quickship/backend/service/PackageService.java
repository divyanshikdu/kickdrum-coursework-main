package com.quickship.backend.service;

import com.quickship.backend.model.Package;
import com.quickship.backend.storage.WarehouseStorage;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PackageService {

    private final WarehouseStorage warehouseStorage;

    public PackageService(WarehouseStorage warehouseStorage) {
        this.warehouseStorage = warehouseStorage;
    }

    public void addPackage(Package pkg) {
        if (warehouseStorage.existsById(pkg.getId())) {
            throw new IllegalArgumentException("Package with same ID already exists");
        }
        pkg.setStatus("PENDING");
        warehouseStorage.addPackage(pkg);

        new Thread(() -> {
            try {
                Thread.sleep(3000);
                pkg.setStatus("SORTED");
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }).start();
    }

    public double calculateRevenue() {
        double totalRevenue = 0.0;

        for (Package pkg : warehouseStorage.getAllPackages()) {
            if ("SORTED".equals(pkg.getStatus())) {
                totalRevenue += pkg.getWeight() * 2.50;
            }
        }
        return totalRevenue;
    }

    public List<Package> getAllPackages() {
        return warehouseStorage.getAllPackages();
    }
}
