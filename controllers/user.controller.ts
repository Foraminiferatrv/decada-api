import { v4 as uuidv4 } from 'uuid'

import type { FastifyRequest, FastifyReply, RouteHandler } from 'fastify'
import { TCreateUser } from '../schemas/user.schema'

export const getAllUsers: RouteHandler = async function (_req, res) {
  const users = await this.db('users')
  console.log(users)
  return res.code(200).send({
    user: await this.db.from('users').select('*'),
  })
  // if (this.db !== undefined) {
  //   // console.log(this.db)
  // }
}
export const createUser: RouteHandler<{ Body: TCreateUser }> = async function (req, res) {
  const { email, password, username, image } = req.body

  const newUser = {
    id: uuidv4(),
    email,
    password,
    username,
    image,
  }

  await this.db('users')
    .insert(newUser)
    .catch((err: Error) => {
      res.code(500).send(err)
      return
    })

  return res.code(201).send(newUser)
}
