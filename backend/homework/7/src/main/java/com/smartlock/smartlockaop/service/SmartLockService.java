package com.smartlock.smartlockaop.service;

import com.smartlock.smartlockaop.annotation.AuditUnlock;
import com.smartlock.smartlockaop.annotation.TrackTime;
import com.smartlock.smartlockaop.dto.UserDto;
import org.springframework.stereotype.Service;

@Service
public class SmartLockService {

    @AuditUnlock
    public void unlock(UserDto user) {
        System.out.println("The door is now open for " + user.getName());
    }

    @TrackTime
    public void checkBattery() {
        try {
            Thread.sleep(200);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("Battery check completed");
    }
}
