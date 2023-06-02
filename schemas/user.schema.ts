import { Type, Static } from '@sinclair/typebox'

export const userSchema = Type.Object({
  id: Type.Required(Type.String()),
  email: Type.String({ format: 'email' }),
  password: Type.String({ minLength: 6 }),
  username: Type.String(),
  image: Type.Optional(Type.String()),
})
export type TUser = Static<typeof userSchema>

export const createUserSchema = Type.Object({
  email: Type.String({ format: 'email' }),
  password: Type.String({ minLength: 6 }),
  username: Type.String(),
  image: Type.Optional(Type.String()),
})
export type TCreateUser = Static<typeof createUserSchema>

// export const deleteUserSchema = Type.Object({
//   id: Type.Required(Type.String()),
// })
// export type TDeleteUser = Static<typeof deleteUserSchema>

export const updateUserSchema = Type.Object({
  // id: Type.Required(Type.String()),
  email: Type.Optional(Type.String({ format: 'email' })),
  password: Type.Optional(Type.String({ minLength: 6 })),
  username: Type.Optional(Type.String()),
  image: Type.Optional(Type.String()),
})
export type TUpdateUser = Static<typeof updateUserSchema>
