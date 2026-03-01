package com.quickship.backend.storage;

import com.quickship.backend.model.Package;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class WarehouseStorage {

    private final List<Package> packages = new ArrayList<>();

    public void addPackage(Package pkg) {
        packages.add(pkg);
    }

    public List<Package> getAllPackages() {
        return packages;
    }
    public boolean existsById(String id) {
        for (Package pkg : packages) {
            if (pkg.getId().equals(id)) {
                return true;
            }
        }
        return false;
    }

}
