#!/bin/bash

CONTAINER_NAME="test"

if [ "$(docker ps -a -q -f name="$CONTAINER_NAME")" ]; then
    echo "Container already exists, exiting"
    exit
fi


# Prompt for project name and container port
# read -p "\nProject Name: " PROJECT_NAME
# read -p "\nContainer Port: " CONTAINER_PORT
# read -p "\nGithub User: " GH_USER
# read -p "\nGitHub Token: " GH_TOKEN

# Create an encryption key and encrypted db password and django secret
DB_PASSWORD=$(openssl rand -hex 32)
ENCRYPTION_KEY=$(openssl rand -hex 32)
DJANGO_SECRET=$(openssl rand -hex 32)

ENCRYPTED_DB_PASSWORD=$( \
    printf "%s" "$DB_PASSWORD" | \
    openssl enc -aes-256-cbc -pbkdf2 -salt -base64 -pass pass:"$ENCRYPTION_KEY" \
    )
# printf "\nencrypted password = %s\n" "$ENCRYPTED_DB_PASSWORD"

DECRYPTED_DB_PASSWORD=$( \
    printf "%s\n" "$ENCRYPTED_DB_PASSWORD" | \
    openssl enc -aes-256-cbc -pbkdf2 -d -base64 -pass pass:"$ENCRYPTION_KEY" \
    )
# printf "\ndecrypted password = %s\n" "$DECRYPTED_DB_PASSWORD"

# create the .env file and write the values
ENV_FILE=".test_env"
touch $ENV_FILE

write_secret(){
    # $1 = key and $2 = value
    printf '\n%s="%s"' "$1" "$2" >> $ENV_FILE
}

write_comment(){
    printf '\n\n# %s' "$1" >> $ENV_FILE
}

write_comment "[DOCKER]"
write_secret "PROJECT_NAME" "test"
write_secret "CUSTOMER_NAME" "test_customer"

write_secret "ENCRYPTION_KEY" $ENCRYPTION_KEY
write_secret "DJANGO_SECRET" $DJANGO_SECRET
write_secret "DB_PASSWORD" $DB_PASSWORD


# printf '\nENCRYPTION_KEY="%s"' "$ENCRYPTION_KEY" >> $ENV_FILE
# printf '\nDJANGO_SECRET="%s"' "$DJANGO_SECRET" >> $ENV_FILE
# printf '\nDB_PASSWORD="%s"' "$DB_PASSWORD" >> $ENV_FILE

exit