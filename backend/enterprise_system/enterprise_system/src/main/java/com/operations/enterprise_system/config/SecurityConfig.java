
package com.operations.enterprise_system.config;

import com.operations.enterprise_system.security.JwtAuthenticationFilter;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(
            JwtAuthenticationFilter jwtAuthenticationFilter) {

        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    // BCrypt password encoder
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // Authentication Manager
    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration configuration)
            throws Exception {

        return configuration.getAuthenticationManager();
    }

    // Main Security Configuration
    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http) throws Exception {

        http
                // Disable CSRF for stateless JWT REST APIs
                .csrf(csrf -> csrf.disable())

                // Enable CORS
                .cors(cors ->
                        cors.configurationSource(corsConfigurationSource())
                )

                // Stateless session management
                .sessionManagement(session ->
                        session.sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS
                        )
                )

                // Handle unauthorized and forbidden requests
                .exceptionHandling(ex -> ex

                        // 401 Unauthorized
                        .authenticationEntryPoint(
                                (request, response, exception) -> {

                                    response.setStatus(
                                            HttpStatus.UNAUTHORIZED.value()
                                    );

                                    response.setContentType(
                                            "application/json"
                                    );

                                    response.setCharacterEncoding("UTF-8");

                                    response.getWriter().write(
                                            "{\"error\":\"Unauthorized\","
                                                    + "\"message\":\"Authentication required\"}"
                                    );
                                }
                        )

                        // 403 Forbidden
                        .accessDeniedHandler(
                                (request, response, exception) -> {

                                    response.setStatus(
                                            HttpStatus.FORBIDDEN.value()
                                    );

                                    response.setContentType(
                                            "application/json"
                                    );

                                    response.setCharacterEncoding("UTF-8");

                                    response.getWriter().write(
                                            "{\"error\":\"Forbidden\","
                                                    + "\"message\":\"You do not have permission\"}"
                                    );
                                }
                        )
                )

                // Role-based authorization
                .authorizeHttpRequests(auth -> auth

                        // Allow CORS preflight requests
                        .requestMatchers(
                                HttpMethod.OPTIONS, "/**"
                        ).permitAll()

                        // Public health endpoint
                        .requestMatchers(
                                "/api/health"
                        ).permitAll()

                        // Public login endpoint
                        .requestMatchers(
                                "/api/auth/login"
                        ).permitAll()

                        // SUPER_ADMIN only
                        .requestMatchers(
                                "/api/super-admin/**"
                        ).hasRole("SUPER_ADMIN")

                        // SUPER_ADMIN and ADMIN
                        .requestMatchers(
                                "/api/admin/**"
                        ).hasAnyRole(
                                "SUPER_ADMIN",
                                "ADMIN"
                        )

                        // SUPER_ADMIN, ADMIN and SITE_MANAGER
                        .requestMatchers(
                                "/api/site-manager/**"
                        ).hasAnyRole(
                                "SUPER_ADMIN",
                                "ADMIN",
                                "SITE_MANAGER"
                        )

                        // Employee endpoints
                        .requestMatchers(
                                "/api/employee/**"
                        ).hasAnyRole(
                                "SUPER_ADMIN",
                                "ADMIN",
                                "SITE_MANAGER",
                                "EMPLOYEE"
                        )

                        // All remaining API endpoints require authentication
                        .requestMatchers(
                                "/api/**"
                        ).authenticated()

                        // Secure all remaining endpoints by default
                        .anyRequest().authenticated()
                )

                // Add JWT filter before username/password authentication
                .addFilterBefore(
                        jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class
                );

        return http.build();
    }

    // CORS Configuration
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration =
                new CorsConfiguration();

        // React frontend origin
        configuration.setAllowedOrigins(
                List.of("http://localhost:5173")
        );

        // Allowed HTTP methods
        configuration.setAllowedMethods(
                List.of(
                        "GET",
                        "POST",
                        "PUT",
                        "PATCH",
                        "DELETE",
                        "OPTIONS"
                )
        );

        // Allowed request headers
        configuration.setAllowedHeaders(
                List.of(
                        "Authorization",
                        "Content-Type"
                )
        );

        configuration.setAllowCredentials(true);

        configuration.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration(
                "/**",
                configuration
        );

        return source;
    }
}
