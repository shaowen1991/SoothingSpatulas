#!/usr/bin/env bash

# Make sure you have permissions to execute the file
# chmod +x ./setup/build.sh
docker stop $(docker ps -a -q) 2>/dev/null
docker rm $(docker ps -a -q) 2>/dev/null
docker rmi $(docker images -q) 2>/dev/null
docker build -t momento-image . 2>/dev/null