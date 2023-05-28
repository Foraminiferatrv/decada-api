import { v4 as uuidv4 } from 'uuid'

import type { FastifyRequest, FastifyReply, RouteHandler } from 'fastify'

export const getAllUsers: RouteHandler = async function (req: FastifyRequest, res: FastifyReply) {
  const users = await this.db('users')
  console.log(users)
  return {
    user: await this.db.from('users').select('*'),
  }
  // if (this.db !== undefined) {
  //   // console.log(this.db)
  // }
}
export const createUser: RouteHandler = async function (req: FastifyRequest, res: FastifyReply) {
  await this.db('users').insert({
    id: uuidv4(),
    email: 'test@mail.com',
    password: 'test',
    username: 'test',
  })

  return { user: 'user' }
}
