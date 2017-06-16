#!/usr/bin/env bash

# Make sure you have permissions to execute the file
# chmod +x ./setup/voice-setup.sh
echo 'touch /code/server/service/AWS.json' | docker exec -i momento sh
echo 'touch /code/server/service/Momento-300463bf99db.json' | docker exec -i momento sh
echo 'touch /code/server/service/user_audio' | docker exec -i momento sh
echo 'touch /code/server/service/user_audio_converted' | docker exec -i momento sh