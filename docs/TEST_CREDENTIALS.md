# EOMS test accounts

The project history confirms these sample identities and roles:

| Role | Email | Password |
|---|---|---|
| SUPER_ADMIN | `admin@example.com` | Set locally; not recoverable from the project context |
| SITE_MANAGER | `manager@enterprise.com` | Set locally; not recoverable from the project context |

Do not assume a password such as `Manager@123` unless you personally set it.
The database stores BCrypt hashes, not readable passwords.

## Set passwords for seeded users

Generate BCrypt hashes using the same Spring Security encoder as the application.
For example, temporarily run this in a Spring-managed component/test:

```java
@Bean
CommandLineRunner printTestPasswordHashes(PasswordEncoder encoder) {
    return args -> {
        System.out.println("ADMIN_HASH=" + encoder.encode("Admin@123"));
        System.out.println("MANAGER_HASH=" + encoder.encode("Manager@123"));
    };
}
```

Copy each printed hash into the matching `password_hash` value in
`database/seed.sql`, execute the seed script, then remove the temporary runner
and restart the backend. Treat these as local development-only credentials;
change them before any shared or production deployment.

If the users already exist, update only their hashes explicitly:

```sql
UPDATE users SET password_hash = '<ADMIN_BCRYPT_HASH>'
WHERE email = 'admin@example.com';

UPDATE users SET password_hash = '<MANAGER_BCRYPT_HASH>'
WHERE email = 'manager@enterprise.com';
```

The known manager email and role were previously created in this project.
The actual password was not reliably confirmed in the conversation.
