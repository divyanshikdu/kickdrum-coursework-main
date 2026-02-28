package com.smartlock.smartlockaop.aspect;

import com.smartlock.smartlockaop.dto.UserDto;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class AccessAuditAspect {

    @Around("@annotation(com.smartlock.smartlockaop.annotation.AuditUnlock)")
    public Object securityGuard(ProceedingJoinPoint pjp) throws Throwable {

        UserDto user = (UserDto) pjp.getArgs()[0];

        if ("Unknown".equals(user.getRole())) {
            System.out.println("SECURITY ALERT: Unauthorized access blocked!");
            return null; // ❌ method will NOT execute
        }

        return pjp.proceed(); // ✅ allowed
    }

    @Around("@annotation(com.smartlock.smartlockaop.annotation.TrackTime)")
    public Object stopwatch(ProceedingJoinPoint pjp) throws Throwable {

        long start = System.currentTimeMillis();
        Object result = pjp.proceed();
        long end = System.currentTimeMillis();

        System.out.println("Time taken: " + (end - start) + " ms");
        return result;
    }
}
