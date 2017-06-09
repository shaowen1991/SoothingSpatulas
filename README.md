# MOMENTO

Discover places near you and find others who share the same interests near you!

## Team

- Chris Keating
- Jack Ren
- Michael Sermersheim
- Nick Anderson

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

# Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Installing Docker](#installing-docker-for-production)

## Usage

> Some usage instructions

## Requirements

- Node 6.9.x
- Redis 3.2.x
- Postgresql 9.6.x
- etc

## Development

### Installing System Dependencies

```
brew install yarn
brew install redis
brew install postgresql
```

Yarn is a replacement for npm. It's faster and *guarantees* consistency -- as you deploy your code in various environments, you won't run the risk of slight variations in what gets installed.

### Install Dependencies

```
yarn global add grunt-cli knex eslint
```

## App Configuration

Override settings `config/default.json` in any environment by making a copy of `config/ENV.example.json` and naming it `config/ENV.json` and setting the appropriate variable.

For environments that require use of environment variables, you can supply variables as defined in `config/custom-environment-variables.json`.

See https://www.npmjs.com/package/config
And https://github.com/lorenwest/node-config/wiki/Environment-Variables#custom-environment-variables

## Database Initialization

IMPORTANT: ensure `postgres` is running before performing these steps.

### Database Creation:

Use grunt to create a new database for your development and test environments:

Development envronment: `grunt pgcreatedb:default`

Other environments, specify like so: `NODE_ENV=test grunt pgcreatedb:default`

### Run Migrations & Data Seeds

In terminal, from the root directory:

`knex migrate:latest --env NODE_ENV`

`knex migrate:rollback --env NODE_ENV`

`knex seed:run --env NODE_ENV`

Note: `--env NODE_ENV` may be omitted for development. For example, `knex migrate:latest` will run all migrations in the development environment, while `knex migrate:latest --env test` will migrate in the test environment.

## Running the App

To run webpack build: `yarn build`

To run server: `yarn start`

To run tests: `yarn test`

To run your redis server for the session store: `redis-server`

### Installing Docker for Production

Install Docker Community Edition for your operating system. Follow instructions to install and start the Docker Community Edition. After downloading the SoothingSpatulas repository, open a terminal in the root directory of SoothingSpatulas. To get Docker Containers running, you'll want to do the commands in the order below.

IMPORTANT: if you were running Postgres in development, then you'll need to run `brew services stop postgresql` prior to running Docker. Otherwise, Docker will note that another application is binded to port 5432.

To build the container: `yarn docker-build`

To load the container: `yarn docker-up`

To create the datbase tables: `yarn docker-migrate`

To seed the database tables: `yarn docker-seed`

To remove the database tables: `yarn docker-migrate-rollback`

To test the application: `yarn docker-test`

To remove the container: `yarn docker-down`

Please be aware that you are turning off the containers when you run the `yarn docker-down` command -- this will take the application and database offline. If you simply wish to update the application container, then you can run `yarn docker-build` and follow that with `yarn docker-up` -- this will update the container and bring your containers back online.

To completely clear all docker containers and images: `yarn docker-reset`