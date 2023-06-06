import type { FastifyInstance } from 'fastify'

import {
  updateConditionSchema,
  createConditionSchema,
  conditionSchema,
  updateConditionsArraySchema,
} from '../schemas/condition.schema'

import {
  getAllConditions,
  createCondition,
  deleteCondition,
  getCondition,
  updateCondition,
  updateAllConditions,
} from '../controllers/condition.controller'

async function conditionRoutes(app: FastifyInstance) {
  app.get('/', { schema: conditionSchema, handler: getAllConditions })
  app.put('/create', { schema: { body: createConditionSchema }, handler: createCondition })
  app.get('/:conditionId', { handler: getCondition })
  app.patch('/:conditionId', { schema: { body: updateConditionSchema }, handler: updateCondition })
  app.patch('/', { schema: { body: updateConditionsArraySchema }, handler: updateAllConditions })
  app.delete('/:conditionId', { handler: deleteCondition })
}

export default conditionRoutes
