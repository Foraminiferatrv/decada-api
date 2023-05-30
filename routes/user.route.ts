import type { FastifyInstance } from 'fastify'
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'

import { userSchema, createUserSchema } from '../schemas/user.schema'

import { createUser, getAllUsers } from '../controllers/user.controller'

async function userRoutes(app: FastifyInstance) {
  app.withTypeProvider<TypeBoxTypeProvider>().get('/', { schema: userSchema, handler: getAllUsers })

  app.put('/create', { schema: { body: createUserSchema }, handler: createUser })
}

export default userRoutes
