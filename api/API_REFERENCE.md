# EOMS API reference (local development)

Base URL: `http://localhost:8080`

All protected requests require:
`Authorization: Bearer <JWT>`

## Authentication
| Method | Endpoint | Purpose | Access |
|---|---|---|---|
| POST | `/api/auth/login` | Authenticate and obtain JWT | Public |
| GET | `/api/auth/me` | Current authenticated user | Authenticated |

Login request:
```json
{"email":"admin@example.com","password":"<your-local-password>"}
```

## Dashboard
| Method | Endpoint | Purpose | Access |
|---|---|---|---|
| GET | `/api/admin/dashboard/statistics` | Dashboard counts for users, sites and units | SUPER_ADMIN, ADMIN |

## Sites
| Method | Endpoint | Purpose | Access |
|---|---|---|---|
| POST | `/api/admin/sites` | Create site | SUPER_ADMIN, ADMIN |
| GET | `/api/admin/sites` | List sites | SUPER_ADMIN, ADMIN |
| GET | `/api/admin/sites/{id}` | Get site | SUPER_ADMIN, ADMIN |
| GET | `/api/admin/sites/search` | Search sites | SUPER_ADMIN, ADMIN |
| PUT | `/api/admin/sites/{id}` | Update site | SUPER_ADMIN, ADMIN |
| PATCH | `/api/admin/sites/{id}/status` | Change site status | SUPER_ADMIN, ADMIN |
| DELETE | `/api/admin/sites/{id}` | Delete site | SUPER_ADMIN, ADMIN |

Status request:
```json
{"status":"INACTIVE"}
```
Allowed values: `ACTIVE`, `INACTIVE`.

## Units
| Method | Endpoint | Purpose | Access |
|---|---|---|---|
| POST | `/api/admin/units` | Create unit | SUPER_ADMIN, ADMIN |
| GET | `/api/admin/units` | List units | SUPER_ADMIN, ADMIN |
| GET | `/api/admin/units/{id}` | Get unit | SUPER_ADMIN, ADMIN |
| GET | `/api/admin/units/site/{siteId}` | List units for a site | SUPER_ADMIN, ADMIN |
| GET | `/api/admin/units/site/{siteId}/status?status=ACTIVE` | Filter units by site and status | SUPER_ADMIN, ADMIN |
| PUT | `/api/admin/units/{id}` | Update unit / transfer site | SUPER_ADMIN, ADMIN |
| PATCH | `/api/admin/units/{id}/status` | Change unit status | SUPER_ADMIN, ADMIN |
| DELETE | `/api/admin/units/{id}` | Delete unit | SUPER_ADMIN, ADMIN |

## User administration
| Method | Endpoint | Purpose | Access |
|---|---|---|---|
| POST | `/api/super-admin/users` | Create user | SUPER_ADMIN |

## Role mapping from current SecurityConfig
| Role | `/api/admin/**` | `/api/super-admin/**` |
|---|---:|---:|
| SUPER_ADMIN | Yes | Yes |
| ADMIN | Yes | No |
| SITE_MANAGER | No | No |
| EMPLOYEE | No | No |

The configured `/api/site-manager/**` and `/api/employee/**` namespaces are reserved for their
role-specific controllers. The endpoints listed in this document do not imply those controllers
already exist.

## Request DTO caution
The route list and selected sample field names are taken from the project details discussed.
Confirm `SiteRequest`, `UnitRequest`, and `UserCreateRequest` before treating sample write
payloads as final. If the backend returns 400, use the validation message and DTO as source
of truth.
