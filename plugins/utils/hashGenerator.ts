import { TypeBoxTypeProvider, FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox'
import bcrypt from 'bcrypt'

import fastifyPlugin from 'fastify-plugin'

declare module 'fastify' {
  export interface FastifyInstance<> {
    hashGenerate: (input: string | Buffer) => Promise<string | undefined>
  }
}

export default fastifyPlugin(async (app) => {
  app.withTypeProvider<TypeBoxTypeProvider>()

  const hashGenerate = async (input: string | Buffer) => {
    const salt = app.config.PSWRD_SALT
    if (!salt) {
      console.log('PSWRD_SALT is undefined.')
      return
    }

    return await bcrypt.hash(input, salt)
  }

  app.decorate('hashGenerate', hashGenerate)
})
