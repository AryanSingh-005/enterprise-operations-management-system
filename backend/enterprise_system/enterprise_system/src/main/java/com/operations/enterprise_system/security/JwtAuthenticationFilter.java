
package com.operations.enterprise_system.security;

import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final CustomUserDetailsService userDetailsService;

    public JwtAuthenticationFilter(
            JwtService jwtService,
            CustomUserDetailsService userDetailsService) {

        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String path = request.getServletPath();

        return ("POST".equalsIgnoreCase(request.getMethod())
                && "/api/auth/login".equals(path))
                || "OPTIONS".equalsIgnoreCase(request.getMethod());
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");

        // If no Bearer token is provided,
        // continue the filter chain.
        if (authHeader == null ||
                !authHeader.startsWith("Bearer ")) {

            filterChain.doFilter(request, response);
            return;
        }

        String token = authHeader.substring(7).trim();

        if (token.isEmpty()) {
            sendUnauthorized(response, "Bearer token is empty");
            return;
        }

        try {

            // Extract username/email from JWT
            String email = jwtService.extractUsername(token);

            if (email == null || email.isBlank()) {
                sendUnauthorized(response, "Invalid JWT subject");
                return;
            }

            // Avoid duplicate authentication
            if (SecurityContextHolder.getContext()
                    .getAuthentication() == null) {

                // Load user from database
                UserDetails userDetails =
                        userDetailsService.loadUserByUsername(email);

                // Validate JWT
                boolean valid =
                        jwtService.isTokenValid(token, userDetails);

                if (!valid) {
                    sendUnauthorized(response,
                            "Invalid or expired JWT");
                    return;
                }

                // Check whether user account is enabled
                if (!userDetails.isEnabled()) {
                    sendUnauthorized(response,
                            "User account is disabled");
                    return;
                }

                // Create authenticated user
                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(
                                userDetails,
                                null,
                                userDetails.getAuthorities()
                        );

                authentication.setDetails(
                        new WebAuthenticationDetailsSource()
                                .buildDetails(request)
                );

                // Store authentication in SecurityContext
                SecurityContextHolder.getContext()
                        .setAuthentication(authentication);
            }

        } catch (UsernameNotFoundException ex) {

            SecurityContextHolder.clearContext();

            sendUnauthorized(response,
                    "User associated with token was not found");

            return;

        } catch (JwtException | IllegalArgumentException ex) {

            SecurityContextHolder.clearContext();

            sendUnauthorized(response,
                    "JWT validation failed");

            return;
        }

        // Continue security filter chain
        filterChain.doFilter(request, response);
    }

    private void sendUnauthorized(
            HttpServletResponse response,
            String message) throws IOException {

        SecurityContextHolder.clearContext();

        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        response.getWriter().write(
                "{\"error\":\"Unauthorized\",\"message\":\""
                        + message + "\"}"
        );
    }
}
