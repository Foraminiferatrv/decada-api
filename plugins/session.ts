import fastifyPlugin from 'fastify-plugin'
import fastifySession from '@fastify/session'
import connectSessionKnex from 'connect-session-knex'
import { sessionIdGenerator } from './utils/sessionIdGenerator'

declare module 'fastify' {
  interface Session {
    user: { user_id: string }
  }
}

const KnexSessionStore = connectSessionKnex(fastifySession)

export default fastifyPlugin(async (app) => {
  const db = app.db
  const sessionStore = new KnexSessionStore({
    knex: db,
    createtable: true,
  })

  app.register(fastifySession, {
    secret: app.config.SESSION_SECRET,
    cookie: { maxAge: 60000, secure: app.config.NODE_ENV === 'prod' },
    store: sessionStore,
    idGenerator: sessionIdGenerator,
  })
})
