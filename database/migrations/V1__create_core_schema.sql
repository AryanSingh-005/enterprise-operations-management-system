-- EOMS database schema (MySQL 8.x)
-- Baseline schema based on the entities/endpoints described in this project.
-- Review against the current JPA entities before applying to an existing DB.
-- This is a non-destructive baseline: it does not DROP existing tables.

CREATE DATABASE IF NOT EXISTS enterprise_operations_db
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE enterprise_operations_db;

CREATE TABLE IF NOT EXISTS users (
  id BIGINT NOT NULL AUTO_INCREMENT,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(190) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(30) NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
    ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (id),
  CONSTRAINT uk_users_email UNIQUE (email),
  CONSTRAINT chk_users_role CHECK
    (role IN ('SUPER_ADMIN','ADMIN','SITE_MANAGER','EMPLOYEE'))
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS sites (
  id BIGINT NOT NULL AUTO_INCREMENT,
  site_name VARCHAR(150) NOT NULL,
  site_code VARCHAR(50) NOT NULL,
  location VARCHAR(255) NOT NULL,
  manager_id BIGINT NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
  created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (id),
  CONSTRAINT uk_sites_site_code UNIQUE (site_code),
  CONSTRAINT chk_sites_status CHECK (status IN ('ACTIVE','INACTIVE')),
  CONSTRAINT fk_sites_manager FOREIGN KEY (manager_id)
    REFERENCES users(id) ON UPDATE CASCADE ON DELETE RESTRICT,
  INDEX idx_sites_manager_id (manager_id),
  INDEX idx_sites_status (status)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS units (
  id BIGINT NOT NULL AUTO_INCREMENT,
  unit_name VARCHAR(150) NOT NULL,
  unit_code VARCHAR(50) NOT NULL,
  site_id BIGINT NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
  created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (id),
  CONSTRAINT uk_units_site_code UNIQUE (site_id, unit_code),
  CONSTRAINT chk_units_status CHECK (status IN ('ACTIVE','INACTIVE')),
  CONSTRAINT fk_units_site FOREIGN KEY (site_id)
    REFERENCES sites(id) ON UPDATE CASCADE ON DELETE RESTRICT,
  INDEX idx_units_site_id (site_id),
  INDEX idx_units_status (status)
) ENGINE=InnoDB;
