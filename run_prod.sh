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
sudo chmod u+x run_prod.sh

# Copy root files in case of updates
cp .env db/.env
cp .env web/.env
cp .dockerignore db/.dockerignore
cp .dockerignore web/.dockerignore

# Rebuild the containers
docker compose down
docker compose -f docker-compose.yml -f docker-compose.prod.yml up --build -d

# Make sure volumes permissions are correct
sudo groupadd staticgroup
sudo usermod -aG staticgroup www-data

# Make sure the file paths exists with correct permissions
sudo mkdir -p /srv/docker/social_media/staticfiles
sudo mkdir -p /srv/docker/social_media/media
sudo mkdir -p /srv/docker/social_media/logs
sudo chown -R www-data:www-data /srv/docker/social_media

# Rebuild the containers
docker compose down
docker compose -f docker-compose.yml -f docker-compose.prod.yml up --build -d

exit
