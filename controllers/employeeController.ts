import { FastifyRequest, FastifyReply } from "fastify";
import {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../services/employeeService";

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

interface UpdateEmployeeBody extends Partial<CreateEmployeeBody> {}

export async function getAllEmployeesHandler(request: FastifyRequest, reply: FastifyReply) {
  try {
    const employerId = (request.user as any).id;
    const query = request.query as { name?: string };
    const name = query.name;
    
    const employees = await getAllEmployees(request.server, employerId, name);
    reply.send(employees);
  } catch (error: any) {
    reply.status(500).send({ error: error.message });
  }
}


export async function getEmployeeHandler(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  try {
    const employerId = (request.user as any).id;
    const employeeId = parseInt(request.params.id);

    const employee = await getEmployeeById(request.server, employeeId, employerId);
    if (!employee) return reply.status(404).send({ error: "Employee not found" });

    reply.send(employee);
  } catch (error: any) {
    reply.status(500).send({ error: error.message });
  }
}

export async function createEmployeeHandler(
  request: FastifyRequest<{ Body: CreateEmployeeBody }>,
  reply: FastifyReply
) {
  try {
    const employerId = (request.user as any).id;
    const employee = await createEmployee(request.server, employerId, request.body);
    reply.status(201).send(employee);
  } catch (error: any) {
    reply.status(400).send({ error: error.message });
  }
}

export async function updateEmployeeHandler(
  request: FastifyRequest<{ Params: { id: string }; Body: UpdateEmployeeBody }>,
  reply: FastifyReply
) {
  try {
    const employerId = (request.user as any).id;
    const employeeId = parseInt(request.params.id);

    const employee = await updateEmployee(request.server, employeeId, employerId, request.body);
    if (!employee) return reply.status(404).send({ error: "Employee not found" });

    reply.send(employee);
  } catch (error: any) {
    reply.status(400).send({ error: error.message });
  }
}

export async function deleteEmployeeHandler(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  try {
    const employerId = (request.user as any).id;
    const employeeId = parseInt(request.params.id);

    const deleted = await deleteEmployee(request.server, employeeId, employerId);
    if (!deleted) return reply.status(404).send({ error: "Employee not found" });

    reply.status(204).send();
  } catch (error: any) {
    reply.status(500).send({ error: error.message });
  }
}
