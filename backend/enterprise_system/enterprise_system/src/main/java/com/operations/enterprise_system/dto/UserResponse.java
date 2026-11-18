package com.operations.enterprise_system.dto;

import com.operations.enterprise_system.entity.enums.Role;

import java.time.LocalDateTime;

public record UserResponse(
        Long id,
        String name,
        String email,
        Role role,
        boolean active,
        LocalDateTime createdAt
) {
}
