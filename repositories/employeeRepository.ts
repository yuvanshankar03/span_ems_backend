import { FastifyInstance } from "fastify";
import { Employee } from "../models";

export async function getAllEmployeesRepo(
  server: FastifyInstance,
  employerId: number,
  name?: string
): Promise<Employee[]> {
  let query = "SELECT * FROM employees WHERE employer_id = $1 AND is_deleted = false";
  const params: (string | number)[] = [employerId];

  if (name && name.trim().length > 0) {
    query += " AND LOWER(name) LIKE $2";
    params.push(`%${name.toLowerCase()}%`);
  }

  query += " ORDER BY created_at DESC";

  const { rows } = await server.pg.query(query, params);
  return rows;
}


export async function getEmployeeByIdRepo(server: FastifyInstance, id: number, employerId: number): Promise<Employee | null> {
  const { rows } = await server.pg.query(
    "SELECT * FROM employees WHERE id = $1 AND employer_id = $2 AND is_deleted = false",
    [id, employerId]
  );
  return rows[0] || null;
}

export async function createEmployeeRepo(
  server: FastifyInstance,
  employee: Omit<Employee, "id" | "created_at" | "updated_at" | "is_deleted">
): Promise<Employee> {
  const { rows } = await server.pg.query(
    `INSERT INTO employees (employer_id, name, ssn, address1, address2, city, state, zip, country) 
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
     RETURNING *`,
    [
      employee.employer_id,
      employee.name,
      employee.ssn,
      employee.address1,
      employee.address2,
      employee.city,
      employee.state,
      employee.zip,
      employee.country,
    ]
  );
  return rows[0];
}

export async function updateEmployeeRepo(
  server: FastifyInstance,
  id: number,
  employerId: number,
  employeeData: Partial<Employee>
): Promise<Employee | null> {
  const { rows } = await server.pg.query(
    `UPDATE employees 
     SET name = $1, ssn = $2, address1 = $3, address2 = $4, city = $5, state = $6, zip = $7, country = $8, updated_at = NOW()
     WHERE id = $9 AND employer_id = $10 AND is_deleted = false 
     RETURNING *`,
    [
      employeeData.name,
      employeeData.ssn,
      employeeData.address1,
      employeeData.address2,
      employeeData.city,
      employeeData.state,
      employeeData.zip,
      employeeData.country,
      id,
      employerId,
    ]
  );
  return rows[0] || null;
}

export async function deleteEmployeeRepo(server: FastifyInstance, id: number, employerId: number): Promise<boolean> {
  const { rowCount } = await server.pg.query(
    "UPDATE employees SET is_deleted = true, updated_at = NOW() WHERE id = $1 AND employer_id = $2",
    [id, employerId]
  );
  return rowCount > 0;
}
