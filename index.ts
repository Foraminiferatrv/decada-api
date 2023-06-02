import Fastify from 'fastify'
import S from 'fluent-json-schema'
import fastifyEnv from '@fastify/env'
import userRoutes from './routes/user.route'
import dotenv from 'dotenv'
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'

import db from './db/db'
import type { Knex } from 'knex'
import planRoutes from './routes/plan.route'

//TODO: Add Swagger

dotenv.config()

declare module 'fastify' {
  export interface FastifyInstance<> {
    config: {
      PORT: number
      PG_CONNECTION_STRING: string
      DB_HOST: string
      DB_USER: string
      DB_PORT: number
      DB_PASSWORD: string
      DB_ID: string
    }
    db: Knex
  }
}

const envToLogger: { [env: string]: {} } = {
  dev: {
    transport: {
      target: 'pino-pretty',
    },
  },
  prod: true,
  test: false,
}

const app = Fastify({
  logger: process.env.NODE_ENV ? envToLogger[process.env.NODE_ENV] : true,
  // logger: true,
}).withTypeProvider<TypeBoxTypeProvider>()

const initialize = async () => {
  const envSchema = S.object()
    .prop('PORT', S.number())
    .prop('DB_HOST', S.string())
    .prop('DB_USER', S.string())
    .prop('DB_PORT', S.number())
    .prop('DB_PASSWORD', S.string())
    .prop('DB_ID', S.string())
    .prop('PG_CONNECTION_STRING', S.string())
    .valueOf()

  app.register(fastifyEnv, { dotenv: true, data: process.env, schema: envSchema })
  await app.after()

  app.register(db)

  app.get('/healthcheck', () => {
    return { status: 'OK' }
  })

  app.register(planRoutes, { prefix: 'api/users/:userId/plans' })
  app.register(userRoutes, { prefix: 'api/users' })
}

initialize()

// fastify.register(autoLoad, {
// dir: join(__dirname, 'routes'),
//   dirNameRoutePrefix: false,
//   options: Object.assign({}, opts),
// })

const listen = async () => {
  try {
    await app.ready()
    app.listen({ port: app.config.PORT || 4000, host: '0.0.0.0' })
  } catch (error) {
    app.log.error(error)
    process.exit(1)
  }
}

listen()
