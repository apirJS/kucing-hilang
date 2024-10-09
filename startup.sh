#!/bin/bash

# Update the apt package index and install packages to allow apt to use a repository over HTTPS
sudo apt-get update
sudo apt-get install -y \
  apt-transport-https \
  ca-certificates \
  curl \
  gnupg \
  lsb-release

# Add Docker’s official GPG key
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Set up the stable repository
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Update the apt package index again
sudo apt-get update

# Install the latest version of Docker Engine and containerd
sudo apt-get install -y docker-ce docker-ce-cli containerd.io

# Install Certbot
sudo apt-get install -y certbot

# Run docker-compose in the background
sudo docker compose -f kucing-hilang/docker-compose-http.yml up -d

mkdir -p kucing-hilang/certs

# Obtain SSL certificate using Certbot
sudo certbot certonly --webroot -w kucing-hilang/certbot/www --agree-tos --no-eff-email --email lancesapr@gmail.com -d www.kucing-hilang.live

sudo cp /etc/letsencrypt/live/www.kucing-hilang.live/fullchain.pem kucing-hilang/certs/fullchain.pem
sudo cp /etc/letsencrypt/live/www.kucing-hilang.live/privkey.pem kucing-hilang/certs/privkey.pem

# Stop the docker-compose services
sudo docker compose -f kucing-hilang/docker-compose-http.yml down

# Start the docker-compose services with SSL
sudo docker compose -f kucing-hilang/docker-compose.yml up -d

# Set up a cron job for auto-renewal of the SSL certificate
(crontab -l ; echo "0 0,12 * * * /usr/bin/certbot renew --quiet --renew-hook 'sudo docker compose -f kucingku-hilang/docker-compose.yml restart'") | crontab -



