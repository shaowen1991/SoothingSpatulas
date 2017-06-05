#!/usr/bin/env bash

# Make sure you have permissions to execute the file
# chmod +x ./setup/build.sh
docker stop momento 2>/dev/null
docker rm momento 2>/dev/null
docker rmi momento-image 2>/dev/null
docker build -t momento-image . 2>/dev/null