package com.operations.enterprise_system.dto.auth;


import com.operations.enterprise_system.entity.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class AuthResponse {

    private String token;
    private String tokenType;
    private long expiresIn;
    private Long userId;
    private String name;
    private String email;
    private Role role;
}
