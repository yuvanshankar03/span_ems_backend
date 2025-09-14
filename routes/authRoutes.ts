import { FastifyInstance } from "fastify";
import { registerHandler, loginHandler } from "../controllers/authController";

export async function authRoutes(server: FastifyInstance) {
  server.post("/signup", registerHandler);
  server.post("/login", loginHandler);
}
