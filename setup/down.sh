#!/usr/bin/env bash

# Make sure you have permissions to execute the file
# chmod +x ./setup/down.sh
docker-compose down 2>/dev/null
printf "\n"

docker ps -a
printf "\n"

docker images
printf "\n"

docker network ls
printf "\n"