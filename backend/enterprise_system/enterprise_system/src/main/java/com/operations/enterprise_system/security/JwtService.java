
package com.operations.enterprise_system.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;

import java.util.Date;
import java.util.function.Function;

@Service
public class JwtService {

    private final SecretKey signingKey;
    private final long expiration;

    public JwtService(
            @Value("${app.jwt.secret}") String secret,
            @Value("${app.jwt.expiration}") long expiration) {

        if (secret == null || secret.isBlank()) {
            throw new IllegalStateException(
                    "JWT secret is not configured");
        }

        if (expiration <= 0) {
            throw new IllegalStateException(
                    "JWT expiration must be greater than zero");
        }

        try {
            byte[] keyBytes =
                    Decoders.BASE64.decode(secret.trim());

            // HS256 requires a minimum 256-bit key
            this.signingKey =
                    Keys.hmacShaKeyFor(keyBytes);

        } catch (IllegalArgumentException ex) {
            throw new IllegalStateException(
                    "Invalid JWT secret. Provide a valid Base64-encoded "
                            + "secret of at least 32 bytes.",
                    ex
            );
        }

        this.expiration = expiration;
    }

    // Generate JWT token
    public String generateToken(UserDetails userDetails) {

        Date now = new Date();

        Date expiry =
                new Date(now.getTime() + expiration);

        return Jwts.builder()
                .subject(userDetails.getUsername())
                .issuedAt(now)
                .expiration(expiry)
                .signWith(signingKey, Jwts.SIG.HS256)
                .compact();
    }

    // Extract username/email from JWT
    public String extractUsername(String token) {

        return extractClaim(
                token,
                Claims::getSubject
        );
    }

    // Extract expiration date from JWT
    public Date extractExpiration(String token) {

        return extractClaim(
                token,
                Claims::getExpiration
        );
    }

    // Extract any specific claim
    public <T> T extractClaim(
            String token,
            Function<Claims, T> claimsResolver) {

        Claims claims = extractAllClaims(token);

        return claimsResolver.apply(claims);
    }

    // Parse JWT and verify its signature
    private Claims extractAllClaims(String token) {

        return Jwts.parser()
                .verifyWith(signingKey)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    // Validate JWT token
    public boolean isTokenValid(
            String token,
            UserDetails userDetails) {

        Claims claims = extractAllClaims(token);

        String username = claims.getSubject();

        Date expiry = claims.getExpiration();

        return username != null
                && username.equals(userDetails.getUsername())
                && expiry != null
                && expiry.after(new Date());
    }

    // Get configured token expiration in milliseconds
    public long getExpiration() {
        return expiration;
    }
}
