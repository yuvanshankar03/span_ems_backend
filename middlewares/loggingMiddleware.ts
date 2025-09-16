import { FastifyRequest, FastifyReply } from "fastify";
import { insertLog } from "../services/logService";

export const loggingMiddleware = async (request: FastifyRequest, reply: FastifyReply) => {
  const start = Date.now();
  const server = request.server;

  console.log(`${request.method} ${request.url}`, {
    body: request.body,
    query: request.query,
    params: request.params,
  });

  const originalSend = reply.send;

  reply.send = function (body?: any) {
    const responseTime = Date.now() - start;
    console.log(`Response: ${reply.statusCode} - ${responseTime}ms`);

    insertLog(
      server,
      {
        method: request.method,
        url: request.url,
        body: request.body,
        query: request.query,
        params: request.params,
      },
      body,
      request.ip,
      request.headers
    ).catch((err) => console.error("Log insert error:", err));

    return originalSend.call(this, body);
  };
};
