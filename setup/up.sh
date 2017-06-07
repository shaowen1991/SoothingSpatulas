#!/usr/bin/env bash

# Make sure you have permissions to execute the file
# chmod +x ./setup/up.sh
docker-compose up -d
printf "\n"

docker ps -a
printf "\n"

docker images
printf "\n"

docker network ls
printf "\n"