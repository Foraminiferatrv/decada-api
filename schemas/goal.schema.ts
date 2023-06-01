import { Type, Static } from '@sinclair/typebox'

export const goalSchema = Type.Object({
  id: Type.Required(Type.String({ format: 'uuid' })),
  goalName: Type.String(),
  isComplete: Type.Boolean(),
  isFavorite: Type.Boolean(),
  priority: Type.Integer(),
  dueTime: Type.Integer(),
  planId: Type.String({ format: 'uuid' }),
})
export type TGoal = Static<typeof goalSchema>

export const createGoalSchema = Type.Object({
  goalName: Type.String(),
  isComplete: Type.Boolean(),
  isFavorite: Type.Boolean(),
  priority: Type.Integer(),
  dueTime: Type.Integer(),
  planId: Type.String({ format: 'uuid' }),
})
export type TCreateGoal = Static<typeof createGoalSchema>

export const deleteGoalSchema = Type.Object({
  id: Type.Required(Type.String({ format: 'uuid' })),
})
export type TDeleteGoal = Static<typeof deleteGoalSchema>

export const updateGoalSchema = Type.Object({
  id: Type.Required(Type.String({ format: 'uuid' })),
  goalName: Type.String(),
  isComplete: Type.Boolean(),
  isFavorite: Type.Boolean(),
  priority: Type.Integer(),
  dueTime: Type.Integer(),
  planId: Type.String({ format: 'uuid' }),
})
export type TUpdateGoal = Static<typeof updateGoalSchema>
