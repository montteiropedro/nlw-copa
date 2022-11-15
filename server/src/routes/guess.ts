import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";

export async function guessRoutes(fastify: FastifyInstance) {
  fastify.get('/api/guesses/count', async () => {
    return {
      count: await prisma.guess.count()
    }
  });
}
