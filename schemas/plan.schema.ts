import { Type, Static } from '@sinclair/typebox'

export const planSchema = Type.Object({
  plan_id: Type.Required(Type.String()),
  plan_name: Type.String(),
  is_complete: Type.Boolean(),
  user_id: Type.String({ format: 'uuid' }),
})
export type TPlan = Static<typeof planSchema>

export const createPlanSchema = Type.Object({
  plan_name: Type.String(),
  is_complete: Type.Optional(Type.Boolean()),
})
export type TCreatePlan = Static<typeof createPlanSchema>

export const updatePlanSchema = Type.Object({
  plan_name: Type.Optional(Type.String()),
  is_complete: Type.Optional(Type.Boolean()),
})
export type TUpdatePlan = Static<typeof updatePlanSchema>
