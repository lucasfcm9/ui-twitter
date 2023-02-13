import fastify from 'fastify'
import cors from '@fastify/cors'

import { tweetsRoutes } from './routes/tweets'

export const app = fastify()

app.register(cors, {
  origin: '*',
})

app.register(tweetsRoutes, {
  prefix: '/tweets',
})
