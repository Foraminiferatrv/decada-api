import type { FastifyInstance } from 'fastify'
import { createUser, getAllUsers } from '../controllers/user.controller'

async function userRoutes(app: FastifyInstance) {
  app.get('/', getAllUsers)

  app.put('/create', createUser)
}

export default userRoutes
