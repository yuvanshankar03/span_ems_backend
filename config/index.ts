import * as dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT ? parseInt(process.env.PORT) : 3001,
  jwtSecret: process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production',
  database: {
    connectionString: process.env.DATABASE_URL || '',
  },
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
};