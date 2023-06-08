import Fastify from 'fastify'
import fastifyEnv from '@fastify/env'
import userRoutes from './routes/user.routes'
import dotenv from 'dotenv'
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import { Type } from '@sinclair/typebox'
import cors from '@fastify/cors'
import fastifyCookie from '@fastify/cookie'

import db from './db/db'
import hashGenerator from './plugins/utils/hashGenerator'
import session from './plugins/session'

import planRoutes from './routes/plan.routes'
import goalRoutes from './routes/goal.routes'
import conditionRoutes from './routes/condition.routes'
import solutionRoutes from './routes/solution.routes'
import obstacleRoutes from './routes/obstacle.routes'
import authRoutes from './routes/auth.routes'

import type { Knex } from 'knex'

//TODO: Add Swagger

dotenv.config()

declare module 'fastify' {
  export interface FastifyInstance<> {
    config: {
      NODE_ENV: 'dev' | 'prod' | 'test'
      PSWRD_SALT: string
      SESSION_SECRET: string
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
}).withTypeProvider<TypeBoxTypeProvider>()

const initialize = async () => {
  const envSchema = Type.Object({
    NODE_ENV: Type.String(),
    PSWRD_SALT: Type.String(),
    SESSION_SECRET: Type.String(),
    PG_CONNECTION_STRING: Type.String(),
    DB_HOST: Type.String(),
    DB_USER: Type.String(),
    DB_ID: Type.String(),
    DB_PASSWORD: Type.String(),
    DB_PORT: Type.Number(),
  })

  //Register plugins
  app.register(fastifyEnv, { dotenv: true, data: process.env, schema: envSchema })
  await app.after()

  app.register(cors, {
    // put your options here
  })
  // await app.after()

  app.register(fastifyCookie, {
    // put your options here
  })
  // await app.after()

  //Register custom plugins
  app.register(db)
  // await app.after()

  app.register(session)
  await app.after()

  app.register(hashGenerator)

  //healthcheck
  app.get('/healthcheck', () => {
    return { status: 'OK' }
  })

  //goal routes
  app.register(authRoutes, {
    prefix: 'api/auth',
  })

  app.register(obstacleRoutes, {
    prefix: 'api/users/:userId/plans/:planId/goals/:goalId/obstacles',
  })
  app.register(solutionRoutes, {
    prefix: 'api/users/:userId/plans/:planId/goals/:goalId/solutions',
  })
  app.register(conditionRoutes, {
    prefix: 'api/users/:userId/plans/:planId/goals/:goalId/conditions',
  })
  app.register(goalRoutes, { prefix: 'api/users/:userId/plans/:planId/goals' })

  //plan routes
  app.register(planRoutes, { prefix: 'api/users/:userId/plans' })

  //user routes
  app.register(userRoutes, { prefix: 'api/users' })
}

initialize()

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
