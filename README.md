# Storefront backend

This repo contains the backend application for an eCommerce store front. It is a RESTful API.

The database schema and and API route information can be found in the [requirements doc](REQUIREMENTS.md).

## Libraries used

The application uses the following libraries:

- Runtime: Node.js (JavaScript)
- Web application framework: Express
- Language: TypeScript
- Database: Postgres
- Testing: Jasmine

## Installation Instructions

### Dev mode

To install the app's dependencies and use the app in dev mode, run the following:

`yarn && yarn create-dev-db`

`yarn create-dev-db` runs a script that uses db-migrate to create a new database called `full_stack_dev` and runs the migrations to create the tables. This script assumes you have installed `postgres` on your local system and the server is running.

To run the app in dev mode execute `yarn start`.

### Test mode

To install the app's dependencies and use the app in test mode, run the following:

`yarn && yarn create-test-db`

`yarn create-test-db` runs a script that uses db-migrate to create a new database called `full_stack_test` and runs the migrations to create the tables. This script assumes you have installed `postgres` on your local system and the server is running.

To run the tests execute `yarn test`.

NOTE: It is not necessary to run `db-migrate up` at the command line as the scripts contain the necessary calls to operations.

### Ports

The application runs on port `3000` with database on `5432`.

### Environment variables

To satisfy Udacity requirements, the following environment variable are needed.

```
NODE_ENV=dev

# DB VARIABLES
POSTGRES_HOST=127.0.0.1
DEV_POSTGRES_DB=full_stack_dev
TEST_POSTGRES_DB=full_stack_test
POSTGRES_USER=postgres
POSTGRES_PASSWORD=996633

# BCRYPT VARIABLES
BCRYPT_PASSWORD = this_is_me
SALT_ROUNDS=10

# JWT
TOKEN_SECRET = 2119
```
