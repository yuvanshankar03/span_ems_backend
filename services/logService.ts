import { FastifyInstance } from "fastify";
import { insertLogRepo } from "../repositories/logingRepository";


export async function insertLog(
  server: FastifyInstance,
  requestData: any,
  responseData: any,
  ip: string,
  headers: any
) {
  return insertLogRepo(server, requestData, responseData, ip, headers);
}
