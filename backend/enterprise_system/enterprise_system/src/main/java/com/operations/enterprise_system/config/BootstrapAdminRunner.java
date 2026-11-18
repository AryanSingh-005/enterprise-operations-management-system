package com.operations.enterprise_system.config;

import com.operations.enterprise_system.entity.User;
import com.operations.enterprise_system.entity.enums.Role;
import com.operations.enterprise_system.repository.UserRepository;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class BootstrapAdminRunner implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${app.bootstrap-admin.name:}")
    private String name;

    @Value("${app.bootstrap-admin.email:}")
    private String email;

    @Value("${app.bootstrap-admin.password:}")
    private String password;

    public BootstrapAdminRunner(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {

        if (email.isBlank() || password.isBlank() || name.isBlank()) {
            System.out.println("Bootstrap admin not configured. Skipping.");
            return;
        }

        if (userRepository.existsByEmail(email)) {
            System.out.println("Bootstrap admin already exists.");
            return;
        }

        User admin = new User();
        admin.setName(name);
        admin.setEmail(email);
        admin.setPassword(passwordEncoder.encode(password));
        admin.setRole(Role.SUPER_ADMIN);
        admin.setActive(true);

        userRepository.save(admin);

        System.out.println("Initial Super Admin account created.");
    }
}
