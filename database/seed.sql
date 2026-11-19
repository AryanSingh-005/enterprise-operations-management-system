-- EOMS sample data (MySQL 8.x)
-- Run after V1__create_core_schema.sql.
-- IMPORTANT: Replace the password_hash values with BCrypt hashes created by
-- the SAME Spring Security BCryptPasswordEncoder configuration used by backend.
-- Do not insert plain-text passwords into password_hash.

USE enterprise_operations_db;

-- These IDs/emails are project sample identities. If they already exist,
-- inspect first rather than blindly changing existing accounts.
INSERT INTO users (id, name, email, password_hash, role, is_active)
VALUES
 (1, 'System Administrator', 'admin@example.com',
  'REPLACE_WITH_BCRYPT_HASH_FOR_ADMIN_PASSWORD', 'SUPER_ADMIN', TRUE),
 (2, 'Noida Site Manager', 'manager@enterprise.com',
  'REPLACE_WITH_BCRYPT_HASH_FOR_MANAGER_PASSWORD', 'SITE_MANAGER', TRUE)
ON DUPLICATE KEY UPDATE
 name = VALUES(name),
 role = VALUES(role),
 is_active = VALUES(is_active);
-- The upsert intentionally does NOT overwrite existing password hashes.

INSERT INTO sites (id, site_name, site_code, location, manager_id, status)
VALUES (2, 'Noida Head Office', 'NOI-001', 'Sector 62, Noida', 2, 'ACTIVE')
ON DUPLICATE KEY UPDATE
 site_name = VALUES(site_name),
 location = VALUES(location),
 manager_id = VALUES(manager_id),
 status = VALUES(status);

INSERT INTO units (unit_name, unit_code, site_id, status)
VALUES
 ('Human Resources', 'HR-001', 2, 'ACTIVE'),
 ('Information Technology', 'IT-001', 2, 'ACTIVE'),
 ('Finance', 'FIN-001', 2, 'ACTIVE')
ON DUPLICATE KEY UPDATE
 unit_name = VALUES(unit_name),
 status = VALUES(status);

SELECT id, name, email, role, is_active FROM users;
SELECT id, site_name, site_code, manager_id, status FROM sites;
SELECT id, unit_name, unit_code, site_id, status FROM units;
