import type { RouteHandler } from 'fastify'
import type { TLogin } from '../schemas/auth.schema'
import type { TUser } from '../schemas/user.schema'

export const loginUser: RouteHandler<{ Body: TLogin }> = async function (req, res) {
  const { email, password } = req.body

  const hashedPassword = await this.hashGenerate(password)
  const users = this.db<TUser>('users')
  const targetUser = await users.where({ email: email }).first()

  if (!targetUser || targetUser.password !== hashedPassword) {
    return res.code(401).send(new Error('Invalid e-mail or password.'))
  }

  req.session.set('user_id', targetUser.user_id)
  req.session.set('is_authenticated', true)

  return res.code(200).send({
    user_id: targetUser.user_id,
    email: targetUser.email,
    username: targetUser.username,
    image: targetUser.image,
  })
}

export const logoutUser: RouteHandler = async (req, res) => {
  console.log(req.session.sessionId)

  return req.session.destroy((error) => {
    if (error) {
      return res.code(500).send(error)
    } else {
      return res.code(200).send('Logged out')
    }
  })
}
