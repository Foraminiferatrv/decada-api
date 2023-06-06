import { Type, Static } from '@sinclair/typebox'

export const solutionSchema = Type.Object({
  solution_id: Type.Required(Type.String({ format: 'uuid' })),
  solution_name: Type.String(),
  is_complete: Type.Boolean(),
  index: Type.Integer(),
  goal_id: Type.String({ format: 'uuid' }),
})
export type TSolution = Static<typeof solutionSchema>

export const createSolutionSchema = Type.Object({
  solution_name: Type.String(),
  is_complete: Type.Optional(Type.Boolean()),
  index: Type.Integer(),
})
export type TCreateSolution = Static<typeof createSolutionSchema>

export const updateSolutionsArraySchema = Type.Array(solutionSchema)
export type TSolutionsArray = Static<typeof updateSolutionsArraySchema>

export const updateSolutionSchema = Type.Object({
  solution_id: Type.Required(Type.String({ format: 'uuid' })),
  solution_name: Type.String(),
  is_complete: Type.Boolean(),
  index: Type.Integer(),
  goal_id: Type.String({ format: 'uuid' }),
})
export type TUpdateSolution = Static<typeof updateSolutionSchema>
