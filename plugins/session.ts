import fastifyPlugin from 'fastify-plugin'
import fastifySession from '@fastify/session'
import connectSessionKnex from 'connect-session-knex'
// import { sessionIdGenerator } from './utils/sessionIdGenerator'

declare module 'fastify' {
  interface Session {
    user_id: string
    is_authenticated: boolean
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
    saveUninitialized: false,
    cookie: {
      maxAge: 600000,
      secure: app.config.NODE_ENV === 'prod',
      // secure: false,
      domain: '127.0.0.1',
      httpOnly: false,
      path: '/',
    },
    rolling: false,
    store: sessionStore,
    // idGenerator: sessionIdGenerator,
  })
})
