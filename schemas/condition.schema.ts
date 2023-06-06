import { Type, Static } from '@sinclair/typebox'

export const conditionSchema = Type.Object({
  condition_id: Type.Required(Type.String({ format: 'uuid' })),
  condition_name: Type.String(),
  is_complete: Type.Optional(Type.Boolean()),
  index: Type.Integer(),
  goal_id: Type.String({ format: 'uuid' }),
})
export type TCondition = Static<typeof conditionSchema>

export const updateConditionsArraySchema = Type.Array(conditionSchema)
export type TConditionsArray = Static<typeof updateConditionsArraySchema>

export const createConditionSchema = Type.Object({
  condition_name: Type.String(),
  is_complete: Type.Optional(Type.Boolean()),
  index: Type.Integer(),
})
export type TCreateCondition = Static<typeof createConditionSchema>

export const updateConditionSchema = Type.Object({
  condition_name: Type.Optional(Type.String()),
  is_complete: Type.Optional(Type.Boolean()),
  index: Type.Optional(Type.Integer()),
})
export type TUpdateCondition = Static<typeof updateConditionSchema>

// export const updateConditionsArraySchema = Type.Array(updateConditionSchema)
// export type TConditionsArray = Static<typeof updateConditionsArraySchema>
