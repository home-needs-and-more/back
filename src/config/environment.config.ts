import { registerAs } from '@nestjs/config';

export const envConfig = registerAs('node', () => ({
  env: process.env.ENVIRONMENT,
}));

export const databaseConfig = registerAs('database', () => ({
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  username: process.env.DB_USERNAME,
  port: process.env.DB_PORT,
}));

export const emailConfig = registerAs('email', () => ({
  senderEmail: process.env.SENDER_EMAIL,
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectURI: process.env.REDIRECT_URI,
  refreshToken: process.env.REFRESH_TOKEN,
}));
