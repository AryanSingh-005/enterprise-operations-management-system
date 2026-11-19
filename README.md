# EOMS database and API handoff

## Contents
- `database/migrations/V1__create_core_schema.sql`: baseline MySQL schema for users, sites and units.
- `database/seed.sql`: sample SUPER_ADMIN and SITE_MANAGER identities, one site and sample units.
- `docs/TEST_CREDENTIALS.md`: test account identity and safe password setup instructions.
- `api/EOMS.postman_collection.json`: Postman collection for the documented endpoints.
- `api/EOMS.local.postman_environment.json`: local environment variables.

## Database setup
1. Back up your current database.
2. Review `V1__create_core_schema.sql` against the actual JPA entities.
3. Execute the migration in MySQL Workbench or MySQL CLI.
4. Generate BCrypt hashes as described in `docs/TEST_CREDENTIALS.md`.
5. Replace placeholders in `seed.sql` and execute it.

Database name: `enterprise_operations_db`.

## Important compatibility note
This handoff is based on the project structure and endpoint details available in
the conversation. It is not generated from a source ZIP or a live database
schema export. Confirm the exact JPA column names, enum types, timestamp
annotations, and ID values before applying it to a database that already has
data. The earlier one-file draft used DROP TABLE; this migration deliberately
does not drop existing tables.

## API collection
Import the JSON collection and environment into Postman. Start the backend on
`http://localhost:8080`, select the `EOMS Local` environment, and run Login.
The collection stores the returned token in `{{token}}` automatically.
`GET /api/auth/me` and the admin endpoints then use that Bearer token.

Role restrictions reflected in the collection:
- `/api/super-admin/**`: SUPER_ADMIN
- `/api/admin/**`: SUPER_ADMIN or ADMIN
- `/api/site-manager/**`: SUPER_ADMIN, ADMIN or SITE_MANAGER
- `/api/employee/**`: authenticated roles as configured in current SecurityConfig

The exact site/unit request DTO fields should be checked against the current
controller DTOs before using write requests.
