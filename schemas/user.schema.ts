import { Type, Static } from '@sinclair/typebox'

export const userSchema = Type.Object({
  user_id: Type.Required(Type.String()),
  email: Type.String({ format: 'email' }),
  password: Type.String({ minLength: 6 }),
  username: Type.String(),
  image: Type.Optional(Type.String()),
})
export type TUser = Static<typeof userSchema>

export const registerUserSchema = Type.Object({
  email: Type.String({ format: 'email' }),
  password: Type.String({ minLength: 6 }),
  username: Type.String(),
  image: Type.Optional(Type.String()),
})
export type TRegisterUser = Static<typeof registerUserSchema>

export const updateUserSchema = Type.Object({
  email: Type.Optional(Type.String({ format: 'email' })),
  password: Type.Optional(Type.String({ minLength: 6 })),
  username: Type.Optional(Type.String()),
  image: Type.Optional(Type.String()),
})
export type TUpdateUser = Static<typeof updateUserSchema>
