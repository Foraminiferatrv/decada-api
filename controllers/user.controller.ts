import { v4 as uuidv4 } from 'uuid'

import type { RouteHandler } from 'fastify'
import type { TCreateUser, TUpdateUser, TUser } from '../schemas/user.schema'

export const getAllUsers: RouteHandler = async function (_req, res) {
  const users = await this.db('users')
  console.log(users)
  return res.code(200).send({
    user: await this.db.from('users').select('*'),
  })
}

export const createUser: RouteHandler<{ Body: TCreateUser }> = async function (req, res) {
  const { email, password, username, image } = req.body

  const newUser = {
    user_id: uuidv4(),
    email,
    password,
    username,
    image,
  }

  return this.db<TUser>('users')
    .insert(newUser)
    .then(() => res.code(201).send(newUser))
    .catch((err: Error) => {
      res.code(500).send(err)
    })
}

export const getUser: RouteHandler<{ Params: { userId: string } }> = async function (req, res) {
  const { userId } = req.params
  const user = await this.db<TUser>('users')
    .where('user_id', userId)
    .first()
    .catch(() => res.code(500).send(new Error('Internal database error!')))

  if (!user) {
    return res.code(404).send(new Error("There's no such user."))
  }

  return res.code(200).send(user)
}

export const updateUser: RouteHandler<{ Body: TUpdateUser; Params: { userId: string } }> =
  async function (req, res) {
    const { userId } = req.params
    const { email, password, username, image } = req.body

    const users = this.db<TUser>('users')
    const user = users
      .where('user_id', userId)
      .first()
      .catch(() => res.code(500).send(new Error('Internal database error!')))

    if (!user) {
      return res.code(404).send(new Error("There's no such user."))
    }
    return await users
      .where('user_id', userId)
      .update(
        {
          email: email,
          password: password,
          username: username,
          image: image,
        },
        ['*'],
      )
      .then((result) => res.code(200).send(result))
      .catch(() => res.code(500).send(new Error('Internal database error!')))
  }

export const deleteUser: RouteHandler<{ Params: { userId: string } }> = async function (req, res) {
  const { userId } = req.params
  const users = this.db<TUser>('users')

  const user = await users
    .where('user_id', userId)
    .first()
    .catch(() => res.code(500).send(new Error('Internal database error!')))

  if (!user) {
    return res.code(404).send(new Error("There's no such user."))
  }

  return users
    .where('user_id', userId)
    .del()
    .then(() => res.code(200).send({ message: 'User has been deleted.' }))
    .catch(() => res.code(500).send(new Error('Internal database error!')))
}
