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

  req.session.set('authenticated', true)
  return res
    .code(200)
    .send({
      user_id: targetUser.user_id,
      email: targetUser.email,
      username: targetUser.username,
      image: targetUser.image,
    })
}
