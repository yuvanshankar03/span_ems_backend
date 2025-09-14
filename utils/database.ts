import { FastifyInstance } from 'fastify';
import postgres from '@fastify/postgres';
import { config } from '../config';

export const configureDatabase = async (server: FastifyInstance) => {
  console.log("🚀 ~ configureDatabase ~ config.database.connectionString:", config.database.connectionString)
  if (!config.database.connectionString) {
    throw new Error('DATABASE_URL environment variable is required');
  }

  await server.register(postgres, {
    connectionString: config.database.connectionString,
  });

  console.log('Database connected successfully');
};