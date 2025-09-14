import { FastifyInstance } from "fastify";
import { createEmployeeHandler, deleteEmployeeHandler, getAllEmployeesHandler, getEmployeeHandler, updateEmployeeHandler } from "../controllers/employeeController";


interface CreateEmployeeBody {
  name: string;
  ssn: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

interface AuthenticatedFastifyInstance extends FastifyInstance {
  authenticate: (request: any, reply: any) => Promise<void>;
}

export async function employeeRoutes(server: FastifyInstance) {
  server.addHook(
    "preHandler",
    (server as AuthenticatedFastifyInstance).authenticate
  );

  server.get("/employees", getAllEmployeesHandler);
  server.get<{ Params: { id: string } }>("/employee/:id", getEmployeeHandler);
  server.post<{ Body: CreateEmployeeBody }>("/employee", createEmployeeHandler);
  server.put<{ Params: { id: string }; Body: Partial<CreateEmployeeBody> }>(
    "/employee/:id",
    updateEmployeeHandler
  );
  server.delete<{ Params: { id: string } }>(
    "/employee/:id",
    deleteEmployeeHandler
  );
}
