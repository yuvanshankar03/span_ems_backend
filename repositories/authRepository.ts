import { FastifyInstance } from "fastify";

export async function createEmployer(server: FastifyInstance, employer: any) {
  const { rows } = await server.pg.query(
    `INSERT INTO employers (name, email, password_hash) 
     VALUES ($1, $2, $3) 
     RETURNING *`,
    [employer.name, employer.email, employer.password_hash]
  );
  return rows[0];
}


export async function findEmployerByEmail(server: FastifyInstance, email: string) {
  const { rows } = await server.pg.query(
    "SELECT * FROM employers WHERE email = $1 AND is_deleted = false",
    [email]
  );
  return rows[0] || null;
}

export async function findEmployerById(server: FastifyInstance, id: number) {
  const { rows } = await server.pg.query(
    "SELECT id, name, email, created_at FROM employers WHERE id = $1 AND is_deleted = false",
    [id]
  );
  return rows[0] || null;
}