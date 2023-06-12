import type { FastifyInstance } from 'fastify'

import { updateUserSchema, registerUserSchema } from '../schemas/user.schema'

import {
  registerUser,
  deleteUser,
  // getAllUsers,
  getUser,
  updateUser,
} from '../controllers/user.controller'

async function userRoutes(app: FastifyInstance) {
  // app.get('/', { schema: userSchema, handler: getAllUsers })
  app.put('/register', {
    schema: { body: registerUserSchema },
    handler: registerUser,
  })
  app.get('/:userId', { handler: getUser })
  app.patch('/:userId', {
    schema: { body: updateUserSchema },

    handler: updateUser,
  })
  app.delete('/:userId', { handler: deleteUser })
}

export default userRoutes
