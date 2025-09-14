import { FastifyRequest, FastifyReply } from "fastify";
import { registerEmployer, loginEmployer } from "../services/authService";

interface RegisterBody {
  name: string;
  email: string;
  password: string;
}

interface LoginBody {
  email: string;
  password: string;
}

export async function registerHandler(
  request: FastifyRequest<{ Body: RegisterBody }>,
  reply: FastifyReply
) {
  try {
    const { name, email, password } = request.body;

    console.log("Registration attempt:", { name, email });

    const employer = await registerEmployer(request.server, {
      name,
      email,
      password,
    });

    const token = (request.server as any).jwt.sign({
      id: employer.id,
      email: employer.email,
    });

    console.log("Registration successful:", employer.email);

    return reply.status(201).send({
      message: "Employer registered successfully",
      token,
      employer,
    });
  } catch (error: any) {
    console.error("Registration error:", error.message);
    return reply.status(400).send({ error: error.message });
  }
}

export async function loginHandler(
  request: FastifyRequest<{ Body: LoginBody }>,
  reply: FastifyReply
) {
  try {
    const { email, password } = request.body;
    console.log("Login attempt:", { email });

    const employer = await loginEmployer(request.server, email, password);

    const token = (request.server as any).jwt.sign({
      id: employer.id,
      email: employer.email,
    });

    return reply.send({
      message: "Login successful",
      token,
      employer,
    });
  } catch (error: any) {
    console.error("Login error:", error.message);
    return reply.status(401).send({ error: error.message });
  }
}
