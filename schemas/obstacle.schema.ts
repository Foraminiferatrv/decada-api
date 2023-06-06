import { Type, Static } from '@sinclair/typebox'

export const obstacleSchema = Type.Object({
  id: Type.Required(Type.String({ format: 'uuid' })),
  obstacleName: Type.String(),
  isComplete: Type.Boolean(),
  index: Type.Integer(),

  goalId: Type.String({ format: 'uuid' }),
})
export type TObstacle = Static<typeof obstacleSchema>

export const createObstacleSchema = Type.Object({
  obstacleName: Type.String(),
  isComplete: Type.Boolean(),
  index: Type.Integer(),
  goalId: Type.String({ format: 'uuid' }),
})
export type TCreateObstacle = Static<typeof createObstacleSchema>

export const deleteObstacleSchema = Type.Object({
  id: Type.Required(Type.String({ format: 'uuid' })),
})
export type TDeleteObstacle = Static<typeof deleteObstacleSchema>

export const updateObstacleSchema = Type.Object({
  id: Type.Required(Type.String({ format: 'uuid' })),
  obstacleName: Type.String(),
  isComplete: Type.Boolean(),
  index: Type.Integer(),
  goalId: Type.String({ format: 'uuid' }),
})
export type TUpdateObstacle = Static<typeof updateObstacleSchema>
