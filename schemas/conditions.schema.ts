import { Type, Static } from '@sinclair/typebox'

export const conditionSchema = Type.Object({
  id: Type.Required(Type.String({ format: 'uuid' })),
  conditionName: Type.String(),
  isComplete: Type.Boolean(),
  index: Type.Integer(),
  
  goalId: Type.String({ format: 'uuid' }),
})
export type TCondition = Static<typeof conditionSchema>

export const createConditionSchema = Type.Object({
  conditionName: Type.String(),
  isComplete: Type.Boolean(),
  index: Type.Integer(),
  goalId: Type.String({ format: 'uuid' }),
})
export type TCreateCondition = Static<typeof createConditionSchema>

export const deleteConditionSchema = Type.Object({
  id: Type.Required(Type.String({ format: 'uuid' })),
})
export type TDeleteCondition = Static<typeof deleteConditionSchema>

export const updateConditionSchema = Type.Object({
  id: Type.Required(Type.String({ format: 'uuid' })),
  conditionName: Type.String(),
  isComplete: Type.Boolean(),
  index: Type.Integer(),
  goalId: Type.String({ format: 'uuid' }),
})
export type TUpdateCondition = Static<typeof updateConditionSchema>
