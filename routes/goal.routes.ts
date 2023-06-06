import type { FastifyInstance } from 'fastify'

import { updateGoalSchema, createGoalSchema, goalSchema } from '../schemas/goal.schema'

import {
  getAllGoals,
  createGoal,
  deleteGoal,
  getGoal,
  updateGoal,
} from '../controllers/goal.controller'

async function goalRoutes(app: FastifyInstance) {
  app.get('/', { schema: goalSchema, handler: getAllGoals })
  app.put('/create', { schema: { body: createGoalSchema }, handler: createGoal })
  app.get('/:goalId', { handler: getGoal })
  app.patch('/:goalId', { schema: { body: updateGoalSchema }, handler: updateGoal })
  app.delete('/:goalId', { handler: deleteGoal })
}

export default goalRoutes
