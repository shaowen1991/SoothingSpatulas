#!/usr/bin/env bash

# Make sure you have permissions to execute the file
# chmod +x ./setup/migrate.sh
echo 'knex migrate:latest --env NODE_ENV' | docker exec -i momento sh