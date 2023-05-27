import type { FastifyInstance } from 'fastify'
import { getAllUsers } from '../controllers/user.controller'

const userRoutes = async (app: FastifyInstance) => {
  app.get('/', getAllUsers)

  // app.get('/createUser',createUser)
}

export default userRoutes
