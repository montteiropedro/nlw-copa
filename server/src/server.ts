import Fastify from 'fastify';
import cors from '@fastify/cors';

import { z } from 'zod';
import { prisma } from './config/prismaClient';

import ShortUniqueId from 'short-unique-id';

async function bootstrap() {
  const fastify = Fastify({
    logger: true,
  });

  await fastify.register(cors, {
    origin: true,
  });

  fastify.get('/api/pools/count', async () => {
    return {
      count: await prisma.pool.count()
    }
  });

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

  fastify.get('/api/users/count', async () => {
    return {
      count: await prisma.user.count()
    }
  });

  fastify.get('/api/guesses/count', async () => {
    return {
      count: await prisma.guess.count()
    }
  });

  await fastify.listen({ port: 3333, host: '0.0.0.0' });
}

bootstrap();
