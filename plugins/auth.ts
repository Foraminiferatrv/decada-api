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
    async (
      req: FastifyRequest<{ Params: { userId: string } }>,
      res: FastifyReply,
      done: HookHandlerDoneFunction,
    ) => {
      const reqSessionId = req.session.sessionId

      if (!reqSessionId) return res.code(401).send(new Error('Unauthorized!'))

      const storedSession = await app
        .db<{ sid: string; sess: { user_id: string; isAuthenticated: boolean }; expired: string }>(
          'sessions',
        )
        .where({ sid: reqSessionId })
        .first()
        .catch(() => res.code(500).send(new Error('Internal database error!')))

      const isAuthorized = storedSession?.sess.user_id === req.session.user_id
      console.log({ storedSess: storedSession?.sess.user_id, reqUserId: req.session.user_id })
      if (!storedSession || !isAuthorized) {
        return res.code(401).send(new Error('Unauthorized!'))
      }
    },
  )
})
