#!/bin/bash

# Prompt for project name and container port
# read -p "\nProject Name: " PROJECT_NAME
# read -p "\nContainer Port: " CONTAINER_PORT

# Create an encryption key and encrypted db password and django secret
DB_PASSWORD=$(openssl rand -hex 32)
ENCRYPTION_KEY=$(openssl rand -hex 32)
DJANGO_SECRET=$(openssl rand -hex 32)

# printf "\ndb password = %s\n" "$DB_PASSWORD"
# printf "\nencryption key = %s\n" "$ENCRYPTION_KEY"

ENCRYPTED_DB_PASSWORD=$( \
    printf "%s" "$DB_PASSWORD" | \
    openssl enc -aes-256-cbc -pbkdf2 -salt -base64 -pass pass:"$ENCRYPTION_KEY" \
    )
printf "\nencrypted password = %s\n" "$ENCRYPTED_DB_PASSWORD"
DECRYPTED_DB_PASSWORD=$( \
    printf "%s\n" "$ENCRYPTED_DB_PASSWORD" | \
    openssl enc -aes-256-cbc -pbkdf2 -d -base64 -pass pass:"$ENCRYPTION_KEY" \
    )
printf "\ndecrypted password = %s\n" "$DECRYPTED_DB_PASSWORD"

# create the .env file and write the values
ENV_FILE=".test_env"
touch $ENV_FILE
printf '\nENCRYPTION_KEY="%s"' "$ENCRYPTION_KEY" >> $ENV_FILE
printf '\nDJANGO_SECRET="%s"' "$DJANGO_SECRET" >> $ENV_FILE
printf '\nDB_PASSWORD="%s"' "$DB_PASSWORD" >> $ENV_FILE

exit