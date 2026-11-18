
package com.operations.enterprise_system.repository;

import com.operations.enterprise_system.entity.User;
import com.operations.enterprise_system.entity.enums.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    // Authentication
    Optional<User> findByEmail(String email);

    // Check duplicate email
    boolean existsByEmail(String email);

    // Count users according to their roles
    long countByRole(Role role);
}
