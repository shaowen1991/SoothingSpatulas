#!/usr/bin/env bash

# Make sure you have permissions to execute the file
# chmod +x ./setup/seed.sh
echo 'knex seed:run --env NODE_ENV' | docker exec -i momento sh