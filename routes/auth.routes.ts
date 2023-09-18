import type { FastifyInstance } from 'fastify'

import { loginSchema } from '../schemas/auth.schema'

import { loginUser, logoutUser } from '../controllers/auth.controller'

async function authRoutes(app: FastifyInstance) {
  app.post('/login', { schema: loginSchema, handler: loginUser })
  app.get('/logout', { handler: logoutUser })
}

export default authRoutes
