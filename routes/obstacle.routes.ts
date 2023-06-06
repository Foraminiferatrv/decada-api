import type { FastifyInstance } from 'fastify'

import {
  updateObstacleSchema,
  createObstacleSchema,
  obstacleSchema,
  updateObstaclesArraySchema,
} from '../schemas/obstacle.schema'

import {
  getAllObstacles,
  createObstacle,
  deleteObstacle,
  getObstacle,
  updateObstacle,
  updateAllObstacles,
} from '../controllers/obstacle.controller'

async function obstacleRoutes(app: FastifyInstance) {
  app.get('/', { schema: obstacleSchema, handler: getAllObstacles })
  app.put('/create', { schema: { body: createObstacleSchema }, handler: createObstacle })
  app.get('/:obstacleId', { handler: getObstacle })
  app.patch('/:obstacleId', { schema: { body: updateObstacleSchema }, handler: updateObstacle })
  app.patch('/', { schema: { body: updateObstaclesArraySchema }, handler: updateAllObstacles })
  app.delete('/:obstacleId', { handler: deleteObstacle })
}

export default obstacleRoutes
