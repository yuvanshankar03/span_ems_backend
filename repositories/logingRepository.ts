import { FastifyInstance } from "fastify";

export async function insertLogRepo(
  server: FastifyInstance,
  requestData: any,
  responseData: any,
  ip: string,
  headers: any
) {
  await server.pg.query(
    `INSERT INTO logs (request_data, response_data, ip, headers) 
     VALUES ($1::jsonb, $2::jsonb, $3, $4::jsonb)`,
    [
      JSON.stringify(requestData),
      JSON.stringify(responseData),
      ip,
      JSON.stringify(headers),
    ]
  );
}
