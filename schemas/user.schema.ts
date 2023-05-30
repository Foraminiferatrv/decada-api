import S from 'fluent-json-schema'
import { Type, Static } from '@sinclair/typebox'

// export const userSchema = S.object()
//   .title('User schema')
//   .prop('id', S.string().required())
//   .prop('email', S.string().format(S.FORMATS.EMAIL).required())
//   .prop('password', S.string().minLength(8).required())
//   .prop('username', S.string().required())
//   .prop('image', S.string())

export const userSchema = Type.Object({
  id: Type.Required(Type.String({})),
  email: Type.String({ format: 'email' }),
  password: Type.String({ minLength: 6 }),
  username: Type.String(),
  image: Type.Optional(Type.String()),
})

export type TUser = Static<typeof userSchema>

// export const createUserSchema = userSchema.only(['email', 'password', 'username', 'image'])
// export const createUserSchema = Type.Object(Type.Extends(userSchema))
export const createUserSchema = Type.Object({
  email: Type.String({ format: 'email' }),
  password: Type.String({ minLength: 6 }),
  username: Type.String(),
  image: Type.Optional(Type.String()),
})

export type TCreateUser = Static<typeof createUserSchema>
