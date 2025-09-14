import { FastifyRequest, FastifyReply } from 'fastify';

export const loggingMiddleware = async (request: FastifyRequest, reply: FastifyReply) => {
  const start = Date.now();
  
  // Log request
  console.log(`${request.method} ${request.url}`, {
    body: request.body,
    query: request.query,
    params: request.params,
  });

  // Store the original send function
  const originalSend = reply.send;
  
  // Override the send function to add logging
  reply.send = function (body?: any) {
    const responseTime = Date.now() - start;
    console.log(`Response: ${reply.statusCode} - ${responseTime}ms`);
    return originalSend.call(this, body);
  };
};