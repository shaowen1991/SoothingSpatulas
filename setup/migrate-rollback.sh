#!/usr/bin/env bash

# Make sure you have permissions to execute the file
# chmod +x ./setup/migrate-rollback.sh
echo 'knex migrate:rollback --env NODE_ENV' | docker exec -i momento sh