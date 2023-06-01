import { Type, Static } from '@sinclair/typebox'

export const planSchema = Type.Object({
  id: Type.Required(Type.String()),
  planName: Type.String(),
  isComplete: Type.Boolean(),
  userId: Type.String({ format: 'uuid' }),
})
export type TPlan = Static<typeof planSchema>

export const createPlanSchema = Type.Object({
  planName: Type.String(),
  isComplete: Type.Boolean(),
  userId: Type.String({ format: 'uuid' }),
})
export type TCreatePlan = Static<typeof createPlanSchema>

export const deletePlanSchema = Type.Object({
  id: Type.Required(Type.String()),
})
export type TDeletePlan = Static<typeof deletePlanSchema>

export const updatePlanSchema = Type.Object({
  id: Type.Required(Type.String()),
  planName: Type.String(),
  isComplete: Type.Boolean(),
  userId: Type.String({ format: 'uuid' }),
})
export type TUpdatePlan = Static<typeof updatePlanSchema>
