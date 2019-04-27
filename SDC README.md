
## Getting Started

## Installing:
- `npm install` to install all the dependencies
- `npm run react` to start the service

##Install PostgreSQL:
- https://www.postgresql.org/download/macosx/

- Start a PSQL server
  $ psql -U username -p

- Log in to user, either `postgres` or create own user

## Create database `rottentomatoes`:

- psql -U postgres
- psql=# CREATE DATABASE reviews

- Connect to reviews database server
- ``` \c reviews```

## Create tables:
- run `knex:migrate:latest` in the terminal to create the tables in PostGres


## Start Local Server:
- ```npm start```which will start the local server on host 9007

## Seeding the Postgres & MongoDB Databases:
- run `knex:seed:run` to seed the Postgres database 
- run `npm run mongoseed` to seed the MongoDB database

## Test:
- Run Jest tests: ```npm run test```

