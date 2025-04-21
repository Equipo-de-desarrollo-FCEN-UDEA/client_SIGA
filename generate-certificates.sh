#!/bin/sh

apk add --no-cache openssl
mkdir -p /certs

if [ ! -f "/certs/siga.udea.edu.co.key" ]; then
    echo "Generando clave privada, CSR y certificado autofirmado para pruebas..."

    # Generar clave privada
    openssl genrsa -out /certs/siga.udea.edu.co.key 4096 || {
        echo "Error al generar la clave privada"
        exit 1
    }

    # Generar CSR (Certificate Signing Request)
    openssl req -new -key /certs/siga.udea.edu.co.key \
        -out /certs/siga.udea.edu.co.csr \
        -config /etc/ssl/openssl.cnf -extensions req_ext -batch || {
        echo "Error al generar el CSR"
        exit 1
    }

    # Generar certificado autofirmado (válido por 30 días)
    openssl x509 -req -days 30 -in /certs/siga.udea.edu.co.csr \
        -signkey /certs/siga.udea.edu.co.key \
        -out /certs/siga.udea.edu.co.crt || {
        echo "Error al generar el certificado autofirmado"
        exit 1
    }

    chmod 644 /certs/*
    echo "Clave privada, CSR y certificado autofirmado generados correctamente:"
    ls -l /certs/
else
    echo "Los certificados ya existen"
fi