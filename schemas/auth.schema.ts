import { Type, Static } from '@sinclair/typebox'

export const loginSchema = Type.Object({
  email: Type.String({ format: 'email' }),
  password: Type.String({ minLength: 6 }),
})
export type TLogin = Static<typeof loginSchema>
