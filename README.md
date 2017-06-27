# MOMENTO

Discover places near you and find others who share the same interests near you!

## Team

- Chris Keating
- Shaowen Ren
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


- Google-cloud/speech: 0.9.2
- Aws-sdk: 2.70.0
- Axios: 0.16.2
- Babel-core: 6.24.1
- Bcrypt-nodejs: 0.0.3
- Bluebird: 3.5.0
- Body-parser: 1.17.1
- Bookshelf: 0.10.3
- Config: 1.26.1
- Connect-flash: 0.1.1
- Connect-redis: 3.2.0
- Cookie-parser: 1.4.3
- Ejs: 2.5.6
- Enzyme: 2.8.2
- Express: 4.15.2
- Express-session: 1.15.1
- Grunt-pg: https://github.com/watsoncj/grunt-pg.git
- jQuery: 3.2.1
- Knex: 0.12.9
- Lodash: 4.17.4
- Morgan: 1.8.1
- Nodemon: 1.11.0
- Passport: 0.3.2
- Passport-facebook: 2.1.1
- Passport-google-oauth: 1.0.0
- Passport-local: 1.0.0
- Passport-twitter: 1.0.4
- Pg: 6.1.5
- Prop-types: 15.5.10
- React: 16.0.0-alpha.6
- React-dom: 15.4.2
- React-native: 0.44.2
- React-native-animatable: 1.2.0
- React-native-audio-player-recorder: 2.0.0
- React-native-fetch-blob: 0.10.5
- React-native-gifted-chat: 0.1.4
- React-native-lock: 0.6.0
- React-native-maps: 0.15.2
- React-native-uuid-generator: 2.0.0
- React-navigation: 1.0.0-beta.11
- React-redux: 5.0.5
- Redis: 2.7.1
- Redux: 3.6.0
- Require: 2.4.20
- Socket.io: 2.0.2
- Uuid: 3.0.1


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

To run Google Speech API: `brew install ffmpeg ` & `export GOOGLE_APPLICATION_CREDENTIALS=/code/server/service/Momento-300463bf99db.json`

IMPORTANT: When you run front-end, run `yarn` and `react-native link` first. Then run `react-native run-ios`.
Make sure `react-native-fetch-blob` is installed; otherwise, you may get a error `Cannot read property DocumentDir of undefined`

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