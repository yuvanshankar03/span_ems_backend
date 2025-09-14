import * as dotenv from 'dotenv';
dotenv.config();
import Fastify from 'fastify';
import cors from '@fastify/cors';
import rateLimit from '@fastify/rate-limit';
import { config } from './config';
import { configureDatabase } from './utils/database';
import { configureJWT } from './utils/jwt';
import { authRoutes } from './routes/authRoutes';
import { loggingMiddleware } from './middlewares/loggingMiddleware';
import { employeeRoutes } from './routes/employeeRoutes';

const server = Fastify({
  logger: true,
});


server.register(cors, {
  origin: config.frontendUrl,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
});


server.register(rateLimit, {
  max: 100,
  timeWindow: '1 minute',
});


configureJWT(server);


server.addHook('preHandler', loggingMiddleware);


server.register(authRoutes, { prefix: '/auth' });
server.register(employeeRoutes, { prefix: '/api/v1' });

const start = async () => {
  try {
    
    await configureDatabase(server);
    
    const port = typeof config.port === 'string' ? parseInt(config.port) : config.port;
    
    await server.listen({ port: port, host: '0.0.0.0' });
    console.log(`Server listening on port ${config.port}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();