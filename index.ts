import Fastify from 'fastify'
import S from 'fluent-json-schema'
import fastifyEnv from '@fastify/env'
import db from './db/db'
import userRoutes from './routes/user.route'

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
    db: any
  }
}

const app = Fastify({
  logger: true,
})

const initialize = async () => {
  const schema = S.object()
    .prop('PORT', S.number())
    .prop('DB_HOST', S.string())
    .prop('DB_USER', S.string())
    .prop('DB_PORT', S.number())
    .prop('DB_PASSWORD', S.string())
    .prop('DB_ID', S.string())
    .prop('PG_CONNECTION_STRING', S.string())
    .valueOf()

  app.register(fastifyEnv, { dotenv: true, data: process.env, schema: schema })
  await app.after()

  app.register(db)

  app.get('/healthcheck', () => {
    return { status: 'OK' }
  })

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
    app.listen({ port: app.config.PORT || 4000, host: 'localhost' })
  } catch (error) {
    app.log.error(error)
    process.exit(1)
  }

  // console.log(`✨ Server started on http://localhost:${port}/ ✨`)
}

listen()
