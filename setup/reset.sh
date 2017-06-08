#!/usr/bin/env bash

# Make sure you have permissions to execute the file
# chmod +x ./setup/reset.sh

# Note this does the same as build but also resets the database
docker stop $(docker ps -a -q) 2>/dev/null
docker rm $(docker ps -a -q) 2>/dev/null
docker rmi $(docker images -q) 2>/dev/null