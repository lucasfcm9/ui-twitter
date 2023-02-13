import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import { z } from 'zod'

export async function tweetsRoutes(app: FastifyInstance) {
  app.post('/', async (request, reply) => {
    const createTweetSchema = z.object({
      content: z.string(),
    })

    const { content } = createTweetSchema.parse(request.body)

    await prisma.tweet.create({
      data: {
        content,
      },
    })

    return reply.status(201).send()
  })
  app.get('/', async (request, reply) => {
    const tweets = await prisma.tweet.findMany()

    return reply.status(200).send({
      tweets,
    })
  })
}
