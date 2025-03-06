# Build stage
FROM node:19.9.0-alpine AS builder
WORKDIR /src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM node:19.9.0-alpine
WORKDIR /src/app
COPY --from=builder /src/app/next.config.mjs ./next.config.mjs
COPY --from=builder /src/app/.next ./.next
COPY --from=builder /src/app/node_modules ./node_modules
COPY --from=builder /src/app/package.json ./package.json

CMD ["npm", "start"]