# Usar una imagen base de Node.js
FROM node:22.14.0-slim

# Establecer el directorio de trabajo
WORKDIR /src

# Copiar los archivos necesarios
COPY package.json package-lock.json ./
RUN npm install

COPY . .

# Construir la aplicación Next.js
RUN npm run build

# Exponer el puerto del frontend
EXPOSE 3000

# Comando para iniciar el servidor
CMD ["npm", "start"]
