import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";

export async function userRoutes(fastify: FastifyInstance) {
  fastify.get('/api/users/count', async () => {
    return {
      count: await prisma.user.count()
    }
  });
}
