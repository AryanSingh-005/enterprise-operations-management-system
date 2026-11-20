# Enterprise Operations Management System

\<p align="center">
&#x20; \*\*A Centralized Platform for Enterprise Resource and Operations Management\*\*
\</p>

\<p align="center">
&#x20; React.js · Spring Boot · Java · MySQL · Spring Security · JWT · Tailwind CSS
\</p>

---

## 1. Project Overview

The **Enterprise Operations Management System (EOMS)** is a full-stack web application designed to streamline and centralize organizational operations.

It provides a unified platform for managing users, multiple operational sites, site managers, and organizational units through a secure, role-based access control system.

The application follows a RESTful architecture, using React.js for the frontend, Spring Boot for backend services, and MySQL for persistent data storage.

### Project Objectives

- Centralize enterprise site and unit management.
- Provide secure user authentication and authorization.
- Implement role-based access to organizational resources.
- Simplify site manager assignment and operational management.
- Monitor organizational activities through a centralized dashboard.
- Maintain data integrity through relational database constraints.

---

## 2. Key Features

| Module          | Features                                                             |
| --------------- | -------------------------------------------------------------------- |
| Authentication  | Secure login, JWT authentication, BCrypt password encryption, logout |
| User Management | User creation, email validation, role assignment                     |
| Site Management | Create, view, update, delete, search and manage site status          |
| Unit Management | Unit CRUD, site association, filtering and status management         |
| Dashboard       | User, site and unit statistics                                       |
| Authorization   | Role-based API access and protected frontend routes                  |
| User Interface  | Responsive layout, sidebar, navbar, loading and error states         |

---

## 3. Technology Stack

| Layer                | Technology                 | Purpose                                 |
| -------------------- | -------------------------- | --------------------------------------- |
| Frontend             | React.js                   | Component-based user interface          |
| Programming Language | JavaScript                 | Frontend application logic              |
| Styling              | Tailwind CSS               | Responsive UI styling                   |
| Build Tool           | Vite                       | Frontend development and bundling       |
| Routing              | React Router DOM           | Client-side navigation                  |
| HTTP Client          | Axios                      | REST API communication                  |
| Backend              | Java, Spring Boot          | Business logic and REST APIs            |
| Security             | Spring Security            | Authentication and authorization        |
| Authentication       | JSON Web Token (JWT)       | Stateless authentication                |
| Password Security    | BCrypt                     | Password hashing                        |
| ORM                  | Hibernate, Spring Data JPA | Database interaction                    |
| Database             | MySQL 8                    | Relational data storage                 |
| Build Tool           | Apache Maven               | Backend dependency and build management |
| API Testing          | Postman                    | REST API testing                        |
| Version Control      | Git and GitHub             | Source code management                  |

---

## 4. System Architecture

The application follows a layered client-server architecture.

```text
             CLIENT LAYER
          React.js + Tailwind CSS
                    |
                    |
             Axios HTTP Client
                    |
                    v
             REST API LAYER
               Spring Boot
                    |
                    v
           SECURITY MIDDLEWARE
          Spring Security + JWT
                    |
                    v
             SERVICE LAYER
          Business Logic & Validation
                    |
                    v
           REPOSITORY LAYER
             Spring Data JPA
                    |
                    v
             DATABASE LAYER
                 MySQL
```

### Layer Responsibilities

| Layer        | Responsibility                                   |
| ------------ | ------------------------------------------------ |
| Presentation | Displays pages and handles user interactions     |
| API          | Receives HTTP requests and returns API responses |
| Security     | Validates JWT tokens and checks user permissions |
| Service      | Implements business rules and validations        |
| Repository   | Performs database operations                     |
| Database     | Stores users, sites, units and relationships     |

---

## 5. User Roles and Permissions

The system supports four predefined roles.

| Role         | Dashboard | Site Management | Unit Management | User Management |
| ------------ | --------- | --------------- | --------------- | --------------- |
| SUPER_ADMIN  | Yes       | Yes             | Yes             | Yes             |
| ADMIN        | Yes       | Yes             | Yes             | Yes             |
| SITE_MANAGER | Yes       | No              | Yes             | No              |
| EMPLOYEE     | Yes       | No              | No              | No              |

**Authorization:** Backend Spring Security rules enforce permissions independently of frontend navigation restrictions.

---

## 6. Project Directory Structure

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
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── authService.js
│   │   │   ├── dashboardService.js
│   │   │   ├── siteService.js
│   │   │   ├── unitService.js
│   │   │   └── userService.js
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Sites.jsx
│   │   │   ├── Units.jsx
│   │   │   ├── Users.jsx
│   │   │   ├── Unauthorized.jsx
│   │   │   └── NotFound.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
│
├── database/
├── postman/
├── screenshots/
└── README.md
```

---

## 7. REST API Documentation

**Base URL**

```text
http://localhost:8080/api
```

All endpoints below are relative to this base URL.

### 7.1 Authentication APIs

| HTTP Method | API Endpoint  | Description                                                                             | Access        |
| ----------- | ------------- | --------------------------------------------------------------------------------------- | ------------- |
| POST        | `/auth/login` | Authenticates a user using email and password and returns a JWT token with user details | Public        |
| GET         | `/auth/me`    | Retrieves the currently authenticated user's information                                | Authenticated |
| GET         | `/health`     | Checks backend application availability                                                 | Public        |

**Login API – Example**

Request:

```http
POST /api/auth/login
Content-Type: application/json
```

```json
{
  "email": "admin@example.com",
  "password": "your-password"
}
```

Successful response structure:

```json
{
  "token": "<JWT_TOKEN>",
  "tokenType": "Bearer",
  "expiresIn": 86400000,
  "userId": 1,
  "name": "System Administrator",
  "email": "admin@example.com",
  "role": "SUPER_ADMIN"
}
```

### 7.2 User Management APIs

| HTTP Method | API Endpoint         | Description                                                    | Access      |
| ----------- | -------------------- | -------------------------------------------------------------- | ----------- |
| POST        | `/super-admin/users` | Creates a new user with the specified role and account details | SUPER_ADMIN |

**Key functionality:**

- Creates organizational users.
- Checks for duplicate email addresses.
- Encrypts passwords using BCrypt.
- Prevents creation of SUPER_ADMIN accounts through this endpoint.

### 7.3 Site Management APIs

| HTTP Method | API Endpoint               | Description                                       | Access             |
| ----------- | -------------------------- | ------------------------------------------------- | ------------------ |
| POST        | `/admin/sites`             | Registers a new operational site                  | SUPER_ADMIN, ADMIN |
| GET         | `/admin/sites`             | Retrieves all registered sites                    | SUPER_ADMIN, ADMIN |
| GET         | `/admin/sites/{id}`        | Retrieves complete details of a specific site     | SUPER_ADMIN, ADMIN |
| GET         | `/admin/sites/search`      | Searches sites using the supported search filters | SUPER_ADMIN, ADMIN |
| PUT         | `/admin/sites/{id}`        | Updates site information and manager assignment   | SUPER_ADMIN, ADMIN |
| PATCH       | `/admin/sites/{id}/status` | Changes the operational status of a site          | SUPER_ADMIN, ADMIN |
| DELETE      | `/admin/sites/{id}`        | Deletes a site after relationship validation      | SUPER_ADMIN, ADMIN |

**Site Management Capabilities**

- Maintain site names and unique site codes.
- Store site locations.
- Assign active site managers.
- Manage ACTIVE and INACTIVE statuses.
- Prevent deletion when dependent units exist.

### 7.4 Unit Management APIs

| HTTP Method | API Endpoint                        | Description                                     | Access                           |
| ----------- | ----------------------------------- | ----------------------------------------------- | -------------------------------- |
| POST        | `/admin/units`                      | Creates a new unit under an existing site       | SUPER_ADMIN, ADMIN               |
| GET         | `/admin/units`                      | Retrieves all operational units                 | SUPER_ADMIN, ADMIN               |
| GET         | `/admin/units/{id}`                 | Retrieves a specific unit by ID                 | SUPER_ADMIN, ADMIN               |
| GET         | `/admin/units/site/{siteId}`        | Retrieves units associated with a specific site | SUPER_ADMIN, ADMIN, SITE_MANAGER |
| GET         | `/admin/units/site/{siteId}/status` | Filters units by site ID and operational status | SUPER_ADMIN, ADMIN, SITE_MANAGER |
| PUT         | `/admin/units/{id}`                 | Updates unit information and site association   | SUPER_ADMIN, ADMIN               |
| PATCH       | `/admin/units/{id}/status`          | Changes a unit's operational status             | SUPER_ADMIN, ADMIN               |
| DELETE      | `/admin/units/{id}`                 | Deletes a unit by its ID                        | SUPER_ADMIN, ADMIN               |

**Unit Management Capabilities**

- Associate units with registered sites.
- Maintain unique unit codes within each site.
- Retrieve units by site.
- Filter units by operational status.
- Update unit information and status.

### 7.5 Dashboard APIs

| HTTP Method | API Endpoint                  | Description                                                | Access             |
| ----------- | ----------------------------- | ---------------------------------------------------------- | ------------------ |
| GET         | `/admin/dashboard/statistics` | Retrieves user, site and unit statistics for the dashboard | SUPER_ADMIN, ADMIN |

**Dashboard Response Fields**

| Field               | Description                 |
| ------------------- | --------------------------- |
| `totalUsers`        | Total registered users      |
| `totalSuperAdmins`  | Total Super Admin accounts  |
| `totalAdmins`       | Total Admin accounts        |
| `totalSiteManagers` | Total Site Manager accounts |
| `totalEmployees`    | Total Employee accounts     |
| `totalSites`        | Total registered sites      |
| `activeSites`       | Number of active sites      |
| `inactiveSites`     | Number of inactive sites    |
| `totalUnits`        | Total registered units      |
| `activeUnits`       | Number of active units      |
| `inactiveUnits`     | Number of inactive units    |

### 7.6 API Authentication

Protected endpoints require a valid JWT token in the Authorization header.

```http
Authorization: Bearer <JWT_TOKEN>
```

**Common HTTP Response Codes**

| Status Code | Meaning               | Description                               |
| ----------- | --------------------- | ----------------------------------------- |
| 200         | OK                    | Request completed successfully            |
| 201         | Created               | Resource created successfully             |
| 204         | No Content            | Resource deleted successfully             |
| 400         | Bad Request           | Invalid request data                      |
| 401         | Unauthorized          | Missing or invalid authentication         |
| 403         | Forbidden             | Insufficient permissions                  |
| 404         | Not Found             | Requested resource does not exist         |
| 409         | Conflict              | Resource conflict, such as duplicate data |
| 500         | Internal Server Error | Unexpected backend error                  |

*Access levels above describe the configured security rules and intended role permissions. Confirm individual controller mappings and service-level checks when maintaining the API.*

---

## 8. Database Design

The core database consists of three primary entities.

### Users

Stores organizational user information, including:

- User ID
- Name
- Email
- Encrypted password
- Role
- Account status

### Sites

Stores operational site information, including:

- Site ID
- Site name
- Unique site code
- Location
- Assigned site manager
- Operational status
- Creation timestamp

### Units

Stores operational unit information, including:

- Unit ID
- Unit name
- Unit code
- Associated site
- Operational status
- Creation timestamp

### Entity Relationship

```text
              USERS
                |
                | Site Manager Assignment
                |
                v
              SITES
                |
                | One-to-Many
                |
                v
              UNITS
```

- A site is assigned to a user with the SITE_MANAGER role.
- A site can contain multiple units.
- Each unit belongs to one site.
- Unit codes are unique within their associated site.

---

## 9. Prerequisites

Install the following before starting the application:

| Software                | Requirement                                |
| ----------------------- | ------------------------------------------ |
| Java JDK                | Version configured in backend `pom.xml`    |
| Apache Maven            | 3.9 or later                               |
| MySQL                   | 8.0 or later                               |
| Node.js                 | Compatible with the installed Vite version |
| npm                     | Installed with Node.js                     |
| Git                     | Latest stable version                      |
| Postman                 | Recommended for API testing                |
| IntelliJ IDEA / VS Code | Recommended development environments       |

---

## 10. Installation and Setup

### Step 1: Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/enterprise-operations-system.git
```

Navigate to the project:

```bash
cd enterprise-operations-system
```

### Step 2: Create the Database

Open MySQL and execute:

```sql
CREATE DATABASE enterprise_operations;
```

### Step 3: Configure the Backend

Navigate to the backend directory:

```bash
cd backend
```

Configure the database connection in:

`src/main/resources/application.yml`

Example:

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
```

Configure the JWT secret using the environment variable expected by the backend.

For Windows PowerShell:

```powershell
$env:JWT_SECRET="YOUR_SECURE_SECRET"
```

Build the backend:

```bash
mvn clean install
```

Start the backend:

```bash
mvn spring-boot:run
```

Backend URL:

```text
http://localhost:8080
```

### Step 4: Configure the Frontend

Open a separate terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

---

## 11. Authentication Workflow

The system uses JWT-based stateless authentication.

```text
User Login
    |
    v
React Login Form
    |
    v
POST /api/auth/login
    |
    v
Spring Security Authentication
    |
    v
JWT Generation
    |
    v
JWT Stored by Frontend
    |
    v
Axios Request Interceptor
    |
    v
Authorization: Bearer <TOKEN>
    |
    v
JWT Validation
    |
    v
Role Authorization
    |
    v
Protected API Response
```

### Security Implementation

- BCrypt password hashing.
- JWT-based stateless authentication.
- Spring Security authorization.
- Role-based endpoint restrictions.
- Protected React routes.
- Automatic JWT attachment through Axios.
- Unauthorized and forbidden response handling.

---

## 12. Running the Application

Start the backend:

```bash
cd backend
mvn spring-boot:run
```

Start the frontend in another terminal:

```bash
cd frontend
npm run dev
```

Open the application:

**Frontend:** [http://localhost:5173](http://localhost:5173)

**Backend:** [http://localhost:8080](http://localhost:8080)

---

## 13. Testing

### Backend Testing

Use Postman to verify:

- Authentication and JWT generation.
- Current user retrieval.
- User creation.
- Site CRUD operations.
- Unit CRUD operations.
- Site-wise unit filtering.
- Dashboard statistics.
- Unauthorized and forbidden API access.

### Frontend Testing

Verify:

- Login with valid and invalid credentials.
- Dashboard statistics retrieval.
- Site creation, editing and deletion.
- Unit creation, editing and deletion.
- Site-based unit filtering.
- User creation and role assignment.
- Role-based navigation.
- Logout functionality.
- Unauthorized access handling.
- Invalid URL handling.

---

## 14. Future Enhancements

The following features are planned for future development:

- Complete user listing and update functionality.
- Employee management module.
- Advanced search, sorting and pagination.
- Interactive dashboard charts.
- Audit logs and activity tracking.
- Notification and alert system.
- Profile and password management.
- Refresh token support.
- Automated unit and integration tests.
- Docker containerization.
- Cloud deployment and CI/CD integration.

---

## 15. Security Considerations

- Never commit database credentials or JWT secrets.
- Do not expose authentication tokens in screenshots or public logs.
- Use HTTPS in production.
- Validate user input on both frontend and backend.
- Keep backend authorization independent of frontend route restrictions.
- Use appropriately secured token storage for production deployments.
- Restrict CORS to trusted frontend origins.

---

## 16. Author

**Aryan Singh**

B.Tech – Computer Science and Engineering

Full Stack Developer

---

## 17. License

This project is developed for educational and enterprise application development purposes.

Add an appropriate open-source license before distributing the project publicly.

---

\<p align="center">   \*\*Enterprise Operations Management System\*\*

*Centralized Operations. Secure Access. Better Management.*

\</p>
