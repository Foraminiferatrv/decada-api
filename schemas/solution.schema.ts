import { Type, Static } from '@sinclair/typebox'

export const solutionSchema = Type.Object({
  id: Type.Required(Type.String({ format: 'uuid' })),
  solutionName: Type.String(),
  isComplete: Type.Boolean(),
  index: Type.Integer(),

  goalId: Type.String({ format: 'uuid' }),
})
export type TSolution = Static<typeof solutionSchema>

export const createSolutionSchema = Type.Object({
  solutionName: Type.String(),
  isComplete: Type.Boolean(),
  index: Type.Integer(),
  goalId: Type.String({ format: 'uuid' }),
})
export type TCreateSolution = Static<typeof createSolutionSchema>

export const deleteSolutionSchema = Type.Object({
  id: Type.Required(Type.String({ format: 'uuid' })),
})
export type TDeleteSolution = Static<typeof deleteSolutionSchema>

export const updateSolutionSchema = Type.Object({
  id: Type.Required(Type.String({ format: 'uuid' })),
  solutionName: Type.String(),
  isComplete: Type.Boolean(),
  index: Type.Integer(),
  goalId: Type.String({ format: 'uuid' }),
})
export type TUpdateSolution = Static<typeof updateSolutionSchema>
