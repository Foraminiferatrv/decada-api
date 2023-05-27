import type { FastifyRequest, FastifyReply } from 'fastify'

export const getAllUsers = (req: FastifyRequest, res: FastifyReply) => {
  return { user: 'user' }
}
