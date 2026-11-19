# Enterprise Operations Management System

A full-stack web application designed to centralize and simplify enterprise operations through user management, site management, unit management, role-based access control, and real-time dashboard statistics.

The system provides a centralized platform where administrators can manage organizational resources while employees and site managers access functionality according to their assigned roles.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [System Architecture](#system-architecture)
- [User Roles](#user-roles)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation and Setup](#installation-and-setup)
- [Backend Configuration](#backend-configuration)
- [Frontend Configuration](#frontend-configuration)
- [API Endpoints](#api-endpoints)
- [Authentication and Authorization](#authentication-and-authorization)
- [Database Design](#database-design)
- [Running the Application](#running-the-application)
- [Testing](#testing)
- [Future Enhancements](#future-enhancements)

---

## Project Overview

The Enterprise Operations Management System is a full-stack enterprise application built using React, Spring Boot, and MySQL.

It enables organizations to manage multiple sites, assign site managers, organize operational units, and control user access through a role-based authorization system.

The application follows a RESTful API architecture, with React handling the user interface and Spring Boot managing business logic, authentication, authorization, and database operations.

## Key Features

### 1. Authentication and Security
- Secure user login.
- JWT-based authentication.
- Password encryption using BCrypt.
- Token-based API authorization.
- Protected frontend routes.
- Role-based access control.
- Logout functionality.

### 2. User Management
- Create new users.
- Assign organizational roles.
- Validate duplicate email addresses.
- Securely store encrypted passwords.
- Prevent unauthorized SUPER_ADMIN creation through the user creation API.

### 3. Site Management
- Create new sites.
- View all registered sites.
- Retrieve individual site details.
- Update site information.
- Assign site managers.
- Activate or deactivate sites.
- Delete sites with relationship validation.
- Search sites.

### 4. Unit Management
- Create operational units.
- View all units.
- Retrieve units by ID.
- Filter units by site.
- Filter units by site and status.
- Update unit information.
- Change unit status.
- Delete units.
- Prevent duplicate unit codes within the same site.

### 5. Dashboard
- Total users.
- Total Super Admins.
- Total Admins.
- Total Site Managers.
- Total Employees.
- Total sites.
- Active and inactive sites.
- Total units.
- Active and inactive units.

### 6. Frontend Interface
- Responsive React interface.
- Login page.
- Dashboard statistics cards.
- Sidebar navigation.
- Navbar with user profile.
- Role-based menu visibility.
- Site and unit management interfaces.
- User creation interface.
- Loading and error components.
- Unauthorized access page.
- Custom 404 page.

---

## Technology Stack

| Category | Technologies |
|---|---|
| Frontend | React.js, JavaScript |
| Styling | Tailwind CSS |
| Build Tool | Vite |
| Routing | React Router DOM |
| HTTP Client | Axios |
| Backend | Java, Spring Boot |
| Security | Spring Security, JWT |
| Password Encryption | BCrypt |
| ORM | Spring Data JPA, Hibernate |
| Database | MySQL 8 |
| Build Management | Apache Maven |
| API Testing | Postman |
| IDE | IntelliJ IDEA, VS Code |
| Version Control | Git, GitHub |

---

## System Architecture

The application follows a three-layer architecture.

```text
          React Frontend
                |
                | Axios / HTTP Requests
                |
                v
        Spring Boot REST APIs
                |
                v
       Spring Security + JWT
                |
                v
         Service Layer
                |
                v
        Repository Layer
                |
                v
           MySQL Database
```

### Architecture Responsibilities

**Frontend Layer**
- Displays application pages.
- Handles user interactions.
- Manages authentication state.
- Sends API requests.
- Displays backend responses.

**Backend Layer**
- Handles REST API requests.
- Validates incoming data.
- Implements business logic.
- Performs authentication and authorization.
- Manages database operations.

**Database Layer**
- Stores user information.
- Stores site information.
- Stores unit information.
- Maintains relationships between entities.

---

## User Roles

The system supports four roles:

| Role | Permissions |
|---|---|
| SUPER_ADMIN | Full system administration and management |
| ADMIN | Site, unit, and user management |
| SITE_MANAGER | Dashboard access and unit management |
| EMPLOYEE | Dashboard access |

Access to backend APIs is enforced through Spring Security. Frontend route restrictions provide an additional user-interface layer and do not replace backend authorization.

---

## Project Structure

```text
enterprise-operations-system/
│
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── .../
│   │   │   │       ├── config/
│   │   │   │       ├── controller/
│   │   │   │       ├── service/
│   │   │   │       ├── repository/
│   │   │   │       ├── entity/
│   │   │   │       ├── dto/
│   │   │   │       ├── security/
│   │   │   │       └── exception/
│   │   │   │
│   │   │   └── resources/
│   │   │       └── application.yml
│   │   │
│   │   └── test/
│   └── pom.xml
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   ├── layout/
│   │   │   └── ProtectedRoute.jsx
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   │
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── authService.js
│   │   │   ├── dashboardService.js
│   │   │   ├── siteService.js
│   │   │   ├── unitService.js
│   │   │   └── userService.js
│   │   │
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Sites.jsx
│   │   │   ├── Units.jsx
│   │   │   ├── Users.jsx
│   │   │   ├── Unauthorized.jsx
│   │   │   └── NotFound.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── package.json
│   └── vite.config.js
│
├── database/
│   └── schema.sql
│
├── postman/
│   └── API-Collection.json
│
├── screenshots/
│
└── README.md
```

*Note: The structure represents the planned project organization. Add optional folders and files as they are created.*

---

## Prerequisites

Install the following software before running the project:

- Java JDK 25 or the version configured in the backend Maven project.
- Apache Maven 3.9+.
- MySQL Server 8.0+.
- Node.js and npm.
- Git.
- IntelliJ IDEA or Visual Studio Code.
- Postman (optional, for API testing).

---

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/enterprise-operations-system.git
```

Navigate to the project:

```bash
cd enterprise-operations-system
```

### 2. Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Build the project:

```bash
mvn clean install
```

Run the Spring Boot application:

```bash
mvn spring-boot:run
```

Backend server:

```text
http://localhost:8080
```

### 3. Frontend Setup

Open another terminal and navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

Frontend application:

```text
http://localhost:5173
```

---

## Backend Configuration

Configure the MySQL database connection in:

`backend/src/main/resources/application.yml`

Example configuration:

```yaml
server:
  port: 8080

spring:
  datasource:
    url: jdbc:mysql://localhost:3306/enterprise_operations
    username: root
    password: YOUR_MYSQL_PASSWORD

  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true
    properties:
      hibernate:
        format_sql: true

app:
  jwt:
    secret: ${JWT_SECRET}
    expiration: 86400000
```

Create the database in MySQL:

```sql
CREATE DATABASE enterprise_operations;
```

Set a secure JWT secret through your environment rather than committing it to GitHub.

For Windows PowerShell:

```powershell
$env:JWT_SECRET="YOUR_SECURE_BASE64_ENCODED_SECRET"
```

Use a sufficiently strong secret compatible with your backend JWT implementation.

**Security Note:** Never commit database passwords, JWT secrets, API keys, or authentication tokens to a public repository.

---

## Frontend Configuration

The Axios instance is configured to communicate with the backend:

```javascript
const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});
```

JWT authentication is handled through an Axios request interceptor.

The frontend currently uses localStorage for authentication token storage.

For production deployments, consider a more secure token-storage approach, such as appropriately configured HttpOnly cookies.

---

## API Endpoints

Base URL:

```text
http://localhost:8080/api
```

### Authentication APIs

| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/login` | Authenticate user |
| GET | `/auth/me` | Get current authenticated user |
| GET | `/health` | Health check |

### User Management APIs

| Method | Endpoint | Description |
|---|---|---|
| POST | `/super-admin/users` | Create a new user |

### Site Management APIs

| Method | Endpoint | Description |
|---|---|---|
| POST | `/admin/sites` | Create site |
| GET | `/admin/sites` | Get all sites |
| GET | `/admin/sites/{id}` | Get site by ID |
| GET | `/admin/sites/search` | Search sites |
| PUT | `/admin/sites/{id}` | Update site |
| PATCH | `/admin/sites/{id}/status` | Update site status |
| DELETE | `/admin/sites/{id}` | Delete site |

### Unit Management APIs

| Method | Endpoint | Description |
|---|---|---|
| POST | `/admin/units` | Create unit |
| GET | `/admin/units` | Get all units |
| GET | `/admin/units/{id}` | Get unit by ID |
| GET | `/admin/units/site/{siteId}` | Get units by site |
| GET | `/admin/units/site/{siteId}/status` | Filter units by site and status |
| PUT | `/admin/units/{id}` | Update unit |
| PATCH | `/admin/units/{id}/status` | Update unit status |
| DELETE | `/admin/units/{id}` | Delete unit |

### Dashboard API

| Method | Endpoint | Description |
|---|---|---|
| GET | `/admin/dashboard/statistics` | Get dashboard statistics |

*All endpoints except the explicitly public endpoints require authentication according to the backend security configuration. Verify request parameters and payloads against the corresponding controllers and DTOs.*

---

## Authentication and Authorization

The application uses JSON Web Tokens (JWT) for stateless authentication.

### Authentication Flow

1. User enters email and password.
2. Frontend sends credentials to `/api/auth/login`.
3. Backend validates credentials.
4. Backend generates a JWT.
5. Frontend stores the returned token.
6. Axios attaches the token to subsequent API requests.
7. Spring Security validates the token.
8. Authorized requests are processed by the backend.

Authorization header format:

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

### Security Features

- BCrypt password hashing.
- JWT token validation.
- Stateless session management.
- Role-based endpoint authorization.
- Protected React routes.
- Custom unauthorized and forbidden responses.

---

## Database Design

The core database entities include:

### Users
Stores user details, login credentials, roles, and account status.

### Sites
Stores site information and assigned site manager relationships.

### Units
Stores operational units associated with individual sites.

### Entity Relationships

```text
       USERS
         |
         | Site Manager
         |
         v
        SITES
         |
         | One-to-Many
         |
         v
        UNITS
```

A site is assigned to a site manager, and each unit belongs to a site.

---

## Running the Application

Start the services in this order:

**Terminal 1 – Backend**

```bash
cd backend
mvn spring-boot:run
```

**Terminal 2 – Frontend**

```bash
cd frontend
npm run dev
```

Open:

```text
http://localhost:5173
```

The backend should be accessible at:

```text
http://localhost:8080
```

---

## Testing

### Backend Testing
Use Postman to test:

- User authentication.
- JWT authorization.
- User creation.
- Site CRUD operations.
- Unit CRUD operations.
- Dashboard statistics.
- Unauthorized access handling.

### Frontend Testing

Verify the following workflows:

- Login with valid credentials.
- Login with invalid credentials.
- Dashboard statistics loading.
- Site creation and updates.
- Unit creation and updates.
- User creation.
- Role-based page access.
- Logout functionality.
- Unauthorized page handling.
- Invalid route handling.

---

## Future Enhancements

The following features can be added to extend the system:

- User listing, editing, and deactivation.
- Dynamic site-manager dropdown.
- Advanced search and pagination.
- Dashboard charts and graphical analytics.
- Employee management.
- Audit logs and activity tracking.
- Notifications and alerts.
- Profile management.
- Password reset functionality.
- Refresh token implementation.
- Docker-based deployment.
- Cloud deployment.
- Automated unit and integration tests.

---

## Contributing

Contributions, suggestions, and improvements are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Push the branch.
5. Open a Pull Request.

---

## Author

**Aryan Singh**

Computer Science & Engineering  
Full Stack Developer

---

## License

This project is developed for educational and enterprise application development purposes.

Add an appropriate open-source license if you intend to distribute the project publicly.
