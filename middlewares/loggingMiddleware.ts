import { FastifyRequest, FastifyReply } from 'fastify';

export const loggingMiddleware = async (request: FastifyRequest, reply: FastifyReply) => {
  const start = Date.now();
  

  console.log(`${request.method} ${request.url}`, {
    body: request.body,
    query: request.query,
    params: request.params,
  });

  
  const originalSend = reply.send;
  
  
  reply.send = function (body?: any) {
    const responseTime = Date.now() - start;
    console.log(`Response: ${reply.statusCode} - ${responseTime}ms`);
    return originalSend.call(this, body);
  };
};