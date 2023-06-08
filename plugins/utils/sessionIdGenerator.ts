import type { FastifyRequest } from 'fastify'
import { v4 as uuidv4 } from 'uuid'

export const sessionIdGenerator = (request: FastifyRequest) => {
  // if (request.session.returningVisitor) return `returningVisitor-${uuidv4()}`

  return uuidv4()
}
