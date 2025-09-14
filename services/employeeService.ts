import { FastifyInstance } from "fastify";
import {
  getAllEmployeesRepo,
  getEmployeeByIdRepo,
  createEmployeeRepo,
  updateEmployeeRepo,
  deleteEmployeeRepo,
} from "../repositories/employeeRepository";

export async function getAllEmployees(server: FastifyInstance, employerId: number, name?: string) {
  return getAllEmployeesRepo(server, employerId, name);
}

export async function getEmployeeById(server: FastifyInstance, id: number, employerId: number) {
  return getEmployeeByIdRepo(server, id, employerId);
}

export async function createEmployee(server: FastifyInstance, employerId: number, employeeData: any) {
  return createEmployeeRepo(server, { 
    employer_id: employerId, 
    ...employeeData 
  });
}

export async function updateEmployee(server: FastifyInstance, id: number, employerId: number, employeeData: any) {
  return updateEmployeeRepo(server, id, employerId, employeeData);
}

export async function deleteEmployee(server: FastifyInstance, id: number, employerId: number) {
  return deleteEmployeeRepo(server, id, employerId);
}