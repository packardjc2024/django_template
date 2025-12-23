#!/bin/bash

# Load the .env file
source .env

# Move into the project's root directory
cd /home/developer/${PROJECT_NAME}

# Pull the GitHub repository
git stash
git pull https://${GH_USER}:${GH_TOKEN}@github.com/${GH_USER}/${PROJECT_NAME}
git stash clear

# Make sure permissions are still good for new update file
sudo chmod u+x update.sh

# Copy root files in case of updates
cp .env db/.env
cp .env web/.env
cp .dockerignore db/.dockerignore
cp .dockerignore web/.dockerignore

# Rebuild the containers
docker compose up --build -d

# Make sure volumes permissions are correct
sudo groupadd staticgroup
sudo usermod -aG staticgroup www-data

PATH_DIRECTORIES=(
    '/srv'
    '/srv/docker' 
)
VOLUME_DIRECTORIES=(
    "/srv/docker/${PROJECT_NAME}/staticfiles" 
    "/srv/docker/${PROJECT_NAME}/media" 
    "/srv/docker/${PROJECT_NAME}/logs" 
)

for path_directory in ${PATH_DIRECTORIES[@]}; do
    sudo chown :staticgroup $path_directory
    sudo chmod g+x $path_directory
done

for volume_directory in ${VOLUME_DIRECTORIES[@]}; do
    sudo chown -R :staticgroup $volume_directory
    sudo chmod -R g+xwr $volume_directory
done

# Rebuild the containers
docker compose down
docker compose up --build -d

exit
