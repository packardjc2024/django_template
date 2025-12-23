#!/bin/bash

# Copy nginx file
sudo cp nginx.txt /etc/nginx/sites-available/docker_portfolio

# Run update.sh file to get containers running
sudo ./update.sh

# Get certificate
sudo ufw allow 'Nginx Full'
sudo ufw delete allow 'Nginx Full'
sudo certbot --nginx -d www.default.com

# Restart everything for changes
sudo systemctl daemon-reload
sudo systemctl restart nginx
sudo ./update.sh