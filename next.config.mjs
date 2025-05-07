import dotenv from 'dotenv';

// Cargar las variables desde el archivo .env
dotenv.config();

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    SECRET_KEY: process.env.SECRET_KEY,
    AUTH_SECRET: process.env.AUTH_SECRET,
  },
};

export default nextConfig;