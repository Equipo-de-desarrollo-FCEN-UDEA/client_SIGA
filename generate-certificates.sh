#!/bin/sh

apk add --no-cache openssl
mkdir -p /certs

if [ ! -f "/certs/siga.udea.edu.co.key" ]; then
    echo "Generando certificados SSL..."
    openssl req -x509 -nodes -days 365 -newkey rsa:4096 \
        -keyout /certs/siga.udea.edu.co.key \
        -out /certs/siga.udea.edu.co.crt \
        -config /etc/ssl/openssl.cnf -extensions req_ext -batch || {
        echo "Error al generar el certificado"
        exit 1
    }
    openssl dhparam -out /certs/dhparam.pem 2048
    chmod 644 /certs/*
    echo "Certificados generados correctamente:"
    ls -l /certs/
else
    echo "Los certificados ya existen"
fi