import fjwt from '@fastify/jwt';
import { FastifyInstance } from 'fastify';
import { config } from '../config';

export const configureJWT = (server: FastifyInstance) => {
  server.register(fjwt, {
    secret: config.jwtSecret,
  });

  server.decorate('authenticate', async (request: any, reply: any) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.status(401).send({ error: 'Unauthorized' });
    }
  });
};