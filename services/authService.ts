import { FastifyInstance } from "fastify";
import { hashPassword, comparePassword } from "../utils/password";
import { findEmployerByEmail, createEmployer } from "../repositories/authRepository";
import { Employer } from "../models";

export async function registerEmployer(
  server: FastifyInstance,
  employerData: { name: string; email: string; password: string }
): Promise<Omit<Employer, "password_hash">> {
  const existingEmployer = await findEmployerByEmail(server, employerData.email);
  if (existingEmployer) {
    throw new Error("Employer with this email already exists");
  }

  const passwordHash = await hashPassword(employerData.password);

  const employer = await createEmployer(server, {
    name: employerData.name,
    email: employerData.email,
    password_hash: passwordHash,
  });

  // remove password_hash before returning
  const { password_hash, ...employerWithoutPassword } = employer;
  return employerWithoutPassword;
}

export async function loginEmployer(
  server: FastifyInstance,
  email: string,
  password: string
): Promise<Omit<Employer, "password_hash">> {
  const employer = await findEmployerByEmail(server, email);
  if (!employer) {
    throw new Error("Invalid email or password");
  }

  const isPasswordValid = await comparePassword(password, employer.password_hash);
  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  const { password_hash, ...employerWithoutPassword } = employer;
  return employerWithoutPassword;
}
