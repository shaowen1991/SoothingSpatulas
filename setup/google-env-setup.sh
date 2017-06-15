#!/usr/bin/env bash

# Make sure you have permissions to execute the file
# chmod +x ./setup/google-env-setup.sh
echo 'export GOOGLE_APPLICATION_CREDENTIALS=/code/server/service/Momento-300463bf99db.json' | docker exec -i voice sh