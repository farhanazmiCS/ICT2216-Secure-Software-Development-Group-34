#!/bin/bash

# Ensure the certs directory exists
mkdir -p certs

# Generate key.pem
openssl genrsa -out certs/key.pem 4096

# Generate csr.pem (Certificate Signing Request)
openssl req -new -key certs/key.pem -out certs/csr.pem -subj "/C=US/ST=State/L=City/O=Organization/OU=Unit/CN=common.name"

# Generate cert.pem (Self-signed Certificate)
openssl x509 -req -days 365 -in certs/csr.pem -signkey certs/key.pem -out certs/cert.pem