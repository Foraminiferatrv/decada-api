import { Type, Static } from '@sinclair/typebox'

export const obstacleSchema = Type.Object({
  obstacle_id: Type.Required(Type.String({ format: 'uuid' })),
  obstacle_name: Type.String(),
  is_complete: Type.Optional(Type.Boolean()),
  index: Type.Integer(),
  goal_id: Type.String({ format: 'uuid' }),
})
export type TObstacle = Static<typeof obstacleSchema>

export const createObstacleSchema = Type.Object({
  obstacle_name: Type.String(),
  is_complete: Type.Optional(Type.Boolean()),
  index: Type.Integer(),
})
export type TCreateObstacle = Static<typeof createObstacleSchema>

export const updateObstaclesArraySchema = Type.Array(obstacleSchema)
export type TObstaclesArray = Static<typeof updateObstaclesArraySchema>

export const updateObstacleSchema = Type.Object({
  obstacle_name: Type.String(),
  is_complete: Type.Optional(Type.Boolean()),
  index: Type.Integer(),
})
export type TUpdateObstacle = Static<typeof updateObstacleSchema>
