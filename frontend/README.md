# Enterprise Operations Management System (EOMS)

A full-stack enterprise management application designed to manage users, organizational sites, operational units, and administrative activities through a centralized platform.

Built with **Java, Spring Boot, Spring Security, JWT, MySQL, React, and Tailwind CSS**.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [System Architecture](#system-architecture)
- [User Roles and Permissions](#user-roles-and-permissions)
- [Database Design](#database-design)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Configuration](#environment-configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Authentication and Security](#authentication-and-security)
- [Testing](#testing)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [Author](#author)

---

## Project Overview

The Enterprise Operations Management System (EOMS) is a centralized web-based application developed to simplify and streamline enterprise operations.

It provides administrative functionality for managing users, sites, operational units, and organizational resources. The system follows a role-based access control approach to ensure that users can access only the resources permitted by their assigned roles.

The application uses a Spring Boot REST API backend, a React-based frontend, and MySQL for persistent data storage.

### Project Objectives

- Centralize enterprise operational management.
- Provide secure user authentication and authorization.
- Manage multiple organizational sites and their operational units.
- Enable role-based access to administrative resources.
- Provide dashboard statistics for monitoring operations.
- Maintain structured and consistent data through relational database constraints.

---

## Key Features

### 1. Authentication and Authorization
- Secure user login using JWT authentication.
- Password encryption using BCrypt.
- Spring Security integration.
- Role-based authorization.
- Protected frontend routes.
- Automatic JWT attachment to API requests.

### 2. User Management
- Create and manage user accounts.
- Assign roles to users.
- Store user information securely.
- Activate and deactivate user accounts.

### 3. Site Management
- Create new organizational sites.
- View and search registered sites.
- Update site information.
- Assign Site Managers.
- Activate or deactivate sites.
- Delete sites subject to business constraints.

### 4. Unit Management
- Create operational units.
- Associate units with organizational sites.
- View units by site.
- Filter units by status.
- Update unit information.
- Transfer units between sites.
- Activate or deactivate units.

### 5. Dashboard and Statistics
- Total users.
- Total Super Admins, Admins, Site Managers and Employees.
- Total organizational sites.
- Active and inactive sites.
- Total operational units.
- Active and inactive units.

### 6. Frontend
- React-based user interface.
- Responsive application layout.
- Reusable UI components.
- Protected application routes.
- API integration using Axios.
- Loading and error states.

---

## Technology Stack

| Category | Technologies |
|---|---|
| Backend | Java, Spring Boot |
| Security | Spring Security, JWT, BCrypt |
| ORM | Spring Data JPA, Hibernate |
| Database | MySQL 8 |
| Frontend | React.js, JavaScript |
| Build Tool | Vite |
| Styling | Tailwind CSS |
| HTTP Client | Axios |
| Routing | React Router DOM |
| Icons | Lucide React |
| API Testing | Postman / Bruno |
| Build Management | Apache Maven |
| Version Control | Git and GitHub |

---

## System Architecture

The application follows a layered backend architecture with a separate frontend client.

```text
             CLIENT LAYER
                   |
             React Frontend
                   |
             Axios HTTP Client
                   |
              REST APIs
                   |
          Spring Security + JWT
                   |
          CONTROLLER LAYER
                   |
            SERVICE LAYER
                   |
          REPOSITORY LAYER
                   |
             Hibernate / JPA
                   |
             MySQL Database
```

### Backend Architecture

| Layer | Responsibility |
|---|---|
| Controller | Handles HTTP requests and responses |
| Service | Contains business logic and validations |
| Repository | Handles database operations |
| Entity | Represents database tables |
| DTO | Transfers data between application layers |
| Security | Handles authentication and authorization |
| Exception | Handles application errors |

---

## User Roles and Permissions

The system implements role-based access control.

| Feature | Super Admin | Admin | Site Manager | Employee |
|---|:---:|:---:|:---:|:---:|
| Dashboard Statistics | ✓ | ✓ | — | — |
| Site Management | ✓ | ✓ | — | — |
| Unit Management | ✓ | ✓ | — | — |
| User Creation | ✓ | — | — | — |

**Note:** This table reflects the currently discussed Spring Security endpoint restrictions. Site Manager and Employee functionality can be expanded through their dedicated API modules.

---

## Database Design

The application uses MySQL as its relational database.

### Database Name

`enterprise_operations_db`

### Main Tables

#### 1. Users

Stores user account information and access roles.

| Column | Description |
|---|---|
| id | Primary key |
| name | User's full name |
| email | Unique email address |
| password_hash | BCrypt encrypted password |
| role | Assigned user role |
| is_active | Account status |
| created_at | Account creation timestamp |
| updated_at | Last update timestamp |

#### 2. Sites

Stores organizational site information.

| Column | Description |
|---|---|
| id | Primary key |
| site_name | Site name |
| site_code | Unique site code |
| location | Site location |
| manager_id | Foreign key referencing users |
| status | Site status |
| created_at | Creation timestamp |

#### 3. Units

Stores operational units associated with organizational sites.

| Column | Description |
|---|---|
| id | Primary key |
| unit_name | Unit name |
| unit_code | Unit code |
| site_id | Foreign key referencing sites |
| status | Unit status |
| created_at | Creation timestamp |

### Database Relationships

- One user acting as a Site Manager can manage multiple sites.
- One site can contain multiple operational units.
- Each site is associated with a Site Manager.
- Each unit belongs to an organizational site.

---

## Project Structure

```text
Enterprise_Operation_System/
│
├── backend/
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       │   └── com/operations/enterprise_system/
│   │       │       ├── config/
│   │       │       ├── controller/
│   │       │       ├── dto/
│   │       │       ├── entity/
│   │       │       ├── exception/
│   │       │       ├── repository/
│   │       │       ├── security/
│   │       │       └── service/
│   │       │
│   │       └── resources/
│   │           └── application.yml
│   │
│   └── pom.xml
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── database/
│   ├── migrations/
│   │   └── V1__create_core_schema.sql
│   └── seed.sql
│
├── api/
│   ├── API_REFERENCE.md
│   ├── EOMS.postman_collection.json
│   └── EOMS.local.postman_environment.json
│
├── docs/
│   └── TEST_CREDENTIALS.md
│
└── README.md
```

*Adjust the directory tree to match the actual repository before publishing.*

---

## Getting Started

Follow these instructions to run the project locally.

### Prerequisites

Install the following:

- Java JDK compatible with the backend Maven configuration.
- Apache Maven.
- Node.js and npm.
- MySQL Server 8.x.
- Git.
- IntelliJ IDEA or VS Code.

### 1. Clone the Repository

```bash
git clone https://github.com/AryanSingh-005/enterprise-operations-management-system.git
```

Navigate to the project directory:

```bash
cd enterprise-operations-management-system
```

### 2. Configure the Database

Create the database:

```sql
CREATE DATABASE enterprise_operations_db;
```

Configure your database connection in the backend `application.yml`.

Run the schema migration and seed scripts in the correct order after checking the existing database.

### 3. Configure the Backend

Navigate to the backend directory:

```bash
cd backend
```

Install dependencies and build:

```bash
mvn clean install
```

Start the Spring Boot application:

```bash
mvn spring-boot:run
```

Backend default URL:

`http://localhost:8080`

### 4. Configure the Frontend

Open another terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the React development server:

```bash
npm run dev
```

Frontend default URL:

`http://localhost:5173`

---

## Environment Configuration

Never commit passwords, JWT secrets, database credentials or API keys to GitHub.

### Backend Configuration

Example `application.yml` configuration:

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/enterprise_operations_db
    username: ${DB_USERNAME}
    password: ${DB_PASSWORD}

  jpa:
    hibernate:
      ddl-auto: update
    show-sql: false

app:
  jwt:
    secret: ${JWT_SECRET}
    expiration: 86400000
```

Configure environment variables before starting the backend.

Example PowerShell:

```powershell
$env:DB_USERNAME="root"
$env:DB_PASSWORD="your_database_password"
$env:JWT_SECRET="your_base64_encoded_secret"
```

Use a sufficiently strong Base64-encoded JWT secret compatible with your JWT implementation.

### Frontend Configuration

Configure the Axios API base URL:

```javascript
baseURL: "http://localhost:8080/api"
```

For production, use an environment variable such as `VITE_API_BASE_URL` instead of hardcoding the backend URL.

---

## API Documentation

Base URL:

`http://localhost:8080/api`

Protected endpoints require a JWT Bearer token.

### Authentication APIs

| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/login` | User login |
| GET | `/auth/me` | Get authenticated user |

### Dashboard APIs

| Method | Endpoint | Description |
|---|---|---|
| GET | `/admin/dashboard/statistics` | Retrieve dashboard statistics |

### User Management APIs

| Method | Endpoint | Description |
|---|---|---|
| POST | `/super-admin/users` | Create a user |

### Site Management APIs

| Method | Endpoint | Description |
|---|---|---|
| POST | `/admin/sites` | Create a site |
| GET | `/admin/sites` | Retrieve all sites |
| GET | `/admin/sites/{id}` | Retrieve a site by ID |
| GET | `/admin/sites/search` | Search sites |
| PUT | `/admin/sites/{id}` | Update site information |
| PATCH | `/admin/sites/{id}/status` | Update site status |
| DELETE | `/admin/sites/{id}` | Delete a site |

### Unit Management APIs

| Method | Endpoint | Description |
|---|---|---|
| POST | `/admin/units` | Create a unit |
| GET | `/admin/units` | Retrieve all units |
| GET | `/admin/units/{id}` | Retrieve a unit by ID |
| GET | `/admin/units/site/{siteId}` | Retrieve units by site |
| GET | `/admin/units/site/{siteId}/status` | Filter units by site and status |
| PUT | `/admin/units/{id}` | Update unit information |
| PATCH | `/admin/units/{id}/status` | Update unit status |
| DELETE | `/admin/units/{id}` | Delete a unit |

For request payloads, response formats and API examples, refer to the `api/API_REFERENCE.md` documentation and Postman collection.

---

## Authentication and Security

Security is implemented using Spring Security and JSON Web Tokens.

The authentication workflow:

1. User submits login credentials.
2. Backend authenticates the user.
3. Password verification is performed using BCrypt.
4. Backend generates a JWT after successful authentication.
5. Frontend stores the authentication token.
6. Axios attaches the token to protected API requests.
7. Spring Security validates the token before granting access.
8. Role-based restrictions control access to protected endpoints.

Example authorization header:

```http
Authorization: Bearer <JWT_TOKEN>
```

---

## Testing

The APIs can be tested using Postman or Bruno.

The repository includes:

- Postman API collection.
- Local Postman environment.
- Sample database records.
- Test credential setup instructions.

Recommended test scenarios:

- Successful and unsuccessful login.
- Access with valid and invalid JWT tokens.
- Access with insufficient permissions.
- Create, read, update and delete sites.
- Create, read, update and delete units.
- Site and unit status changes.
- Dashboard statistics validation.
- Duplicate email and duplicate site/unit code validation.

---

## Future Enhancements

Potential improvements planned for future versions:

- Dedicated Site Manager and Employee dashboards.
- Employee assignment and workforce management.
- Advanced analytics and reporting.
- Pagination, sorting and advanced filtering.
- Audit logs and activity tracking.
- Email notifications.
- File and document management.
- Automated backend and frontend testing.
- Docker-based deployment.
- Cloud deployment and CI/CD integration.
- API documentation using Swagger/OpenAPI.

---

## Contributing

Contributions, suggestions and improvements are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Make your changes.
4. Test the implementation.
5. Submit a pull request.

---

## Author

**Aryan Singh**

B.Tech – Computer Science and Engineering

GitHub: [AryanSingh-005](https://github.com/AryanSingh-005)

Project: [Enterprise Operations Management System](https://github.com/AryanSingh-005/enterprise-operations-management-system)

---

## License

This project is developed for educational and portfolio purposes. Add an appropriate open-source license file if you intend to distribute it under a specific license.

---

**Enterprise Operations Management System (EOMS)**

*Centralizing Enterprise Operations Through Secure and Scalable Technology.*
