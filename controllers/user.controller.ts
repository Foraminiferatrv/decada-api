import { v4 as uuidv4 } from 'uuid'

import type { FastifyRequest, FastifyReply, RouteHandler } from 'fastify'
import { TCreateUser, TUser } from '../schemas/user.schema'

export const getAllUsers: RouteHandler = async function (_req, res) {
  const users = await this.db('users')
  console.log(users)
  return res.code(200).send({
    user: await this.db.from('users').select('*'),
  })
}

export const createUser: RouteHandler<{ Body: TCreateUser }> = async function (req, res) {
  const { email, password, username, image } = req.body
  console.log('FROM_ALL_USERS:::::::::::::::::')
  const newUser = {
    id: uuidv4(),
    email,
    password,
    username,
    image,
  }

  await this.db<TUser>('users')
    .insert(newUser)
    .catch((err: Error) => {
      res.code(500).send(err)
      return
    })

  return res.code(201).send(newUser)
}

export const getUser: RouteHandler<{ Params: { userId: string } }> = async function (req, res) {
  const { userId } = req.params
  let user = null
  // console.log(req)

  return this.db<TUser>('users')
    .where('user_id', userId)
    .then((user) => res.code(200).send(user))
    .catch(() => res.code(500).send(new Error('Invalid user id.')))
}

export const deleteUser: RouteHandler<{ Params: { userId: string } }> = async function (req, res) {}
