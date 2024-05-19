import dotenv from 'dotenv';
dotenv.config();

export const environmentVariables = {
  NODE_ENV: process.env.NODE_ENV,
  appPort: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
};
