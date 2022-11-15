import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from 'zod';

import ShortUniqueId from "short-unique-id";

export async function poolRoutes(fastify: FastifyInstance) {
  fastify.post('/api/pools', async (req, res) => {
    const createPoolBody = z.object({
      title: z.string({ invalid_type_error: "Title can't be blank." })
    });
  
    const { title } = createPoolBody.parse(req.body); 
    
    const generate = new ShortUniqueId({ length: 6 });
    const code = String(generate()).toUpperCase();
  
    await prisma.pool.create({
      data: {
        title,
        code
      }
    });
  
    return res.status(201).send({ code });
  });
  
  fastify.get('/api/pools/count', async () => {
    return {
      count: await prisma.pool.count()
    }
  });
}
