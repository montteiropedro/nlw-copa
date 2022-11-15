import { FastifyInstance } from "fastify";
import { z } from "zod";

export async function authRoutes(fastify: FastifyInstance) {
  fastify.post('/users', async (req, res) => {
    const bodySchema = z.object({
      access_token: z.string()
    });

    const { access_token } = bodySchema.parse(req.body);

    const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${access_token}`,
      }
    });

    const userData = await userResponse.json();

    const userInfoSchema = z.object({
      id: z.string(),
      name: z.string(),
      email: z.string().email(),
      picture: z.string().url()
    });

    const userInfo = userInfoSchema.parse(userData);

    return { userInfo };
  });
}
