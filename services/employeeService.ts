import { FastifyInstance } from "fastify";
import {
  getAllEmployeesRepo,
  getEmployeeByIdRepo,
  createEmployeeRepo,
  updateEmployeeRepo,
  deleteEmployeeRepo,
} from "../repositories/employeeRepository";
import { Employee } from "../models";

export async function getAllEmployees(
  server: FastifyInstance,
  employerId: number,
  name?: string
): Promise<Employee[]> {
  return getAllEmployeesRepo(server, employerId, name);
}


export async function getEmployeeById(server: FastifyInstance, id: number, employerId: number): Promise<Employee | null> {
  return getEmployeeByIdRepo(server, id, employerId);
}

export async function createEmployee(
  server: FastifyInstance,
  employerId: number,
  employeeData: Omit<Employee, "id" | "employer_id" | "created_at" | "updated_at" | "is_deleted">
): Promise<Employee> {
  return createEmployeeRepo(server, { employer_id: employerId, ...employeeData });
}

export async function updateEmployee(
  server: FastifyInstance,
  id: number,
  employerId: number,
  employeeData: Partial<Employee>
): Promise<Employee | null> {
  return updateEmployeeRepo(server, id, employerId, employeeData);
}

export async function deleteEmployee(server: FastifyInstance, id: number, employerId: number): Promise<boolean> {
  return deleteEmployeeRepo(server, id, employerId);
}
