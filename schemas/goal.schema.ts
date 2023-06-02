import { Type, Static } from '@sinclair/typebox'

export const goalSchema = Type.Object({
  id: Type.Required(Type.String({ format: 'uuid' })),
  goal_name: Type.String(),
  is_complete: Type.Optional(Type.Boolean()),
  is_favorite: Type.Optional(Type.Boolean()),
  priority: Type.Optional(Type.Integer()),
  due_time: Type.Optional(Type.Integer()),
  plan_id: Type.String({ format: 'uuid' }),
})
export type TGoal = Static<typeof goalSchema>

export const createGoalSchema = Type.Object({
  goal_name: Type.String(),
  is_complete: Type.Optional(Type.Boolean()),
  is_favorite: Type.Optional(Type.Boolean()),
  priority: Type.Optional(Type.Integer()),
  due_time: Type.Optional(Type.Integer()),
})
export type TCreateGoal = Static<typeof createGoalSchema>

export const updateGoalSchema = Type.Object({
  goal_name: Type.Optional(Type.String()),
  is_complete: Type.Optional(Type.Boolean()),
  is_favorite: Type.Optional(Type.Boolean()),
  priority: Type.Optional(Type.Integer()),
  due_time: Type.Optional(Type.Integer()),
})
export type TUpdateGoal = Static<typeof updateGoalSchema>
