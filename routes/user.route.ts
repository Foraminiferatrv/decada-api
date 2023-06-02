import type { FastifyInstance } from 'fastify'

import { updateUserSchema, createUserSchema } from '../schemas/user.schema'

import {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from '../controllers/user.controller'

async function userRoutes(app: FastifyInstance) {
  // app.get('/', { schema: userSchema, handler: getAllUsers })

  app.put('/create', { schema: { body: createUserSchema }, handler: createUser })

  app.get('/:userId', { handler: getUser })
  app.patch('/:userId', { schema: { body: updateUserSchema }, handler: updateUser })
  app.delete('/:userId', { handler: deleteUser })
}

export default userRoutes
