import { HookHandlerDoneFunction } from 'fastify'
import fastifyPlugin from 'fastify-plugin'
import type { FastifyReply } from 'fastify/types/reply'
import type { FastifyRequest } from 'fastify/types/request'

declare module 'fastify' {
  export interface FastifyInstance<> {
    verifySession: (req: FastifyRequest, res: FastifyReply, done?: HookHandlerDoneFunction) => void
  }
}

export default fastifyPlugin(async (app) => {
  app.decorate(
    'verifySession',
    async (req: FastifyRequest, res: FastifyReply, done: HookHandlerDoneFunction) => {
      const sessionId = req.session.sessionId

      if (!sessionId) return res.code(401).send(new Error('Unauthorized!'))

      const storedSession = await app
        .db<{ sid: string; sess: { authenticated: boolean }; expired: string }>('sessions')
        .where({ sid: sessionId })
        .first()
        .catch(() => res.code(500).send(new Error('Internal database error!')))

      const isAuthenticated = storedSession?.sess.authenticated

      if (!isAuthenticated) {
        return res.code(401).send(new Error('Unauthorized!'))
      }
    },
  )
})
