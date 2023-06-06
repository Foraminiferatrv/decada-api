import type { FastifyInstance } from 'fastify'

import { updatePlanSchema, createPlanSchema, planSchema } from '../schemas/plan.schema'

import {
  getAllPlans,
  createPlan,
  deletePlan,
  getPlan,
  updatePlan,
} from '../controllers/plan.controller'

async function planRoutes(app: FastifyInstance) {
  app.get('/', { schema: planSchema, handler: getAllPlans })
  app.put('/create', { schema: { body: createPlanSchema }, handler: createPlan })
  app.get('/:planId', { handler: getPlan })
  app.patch('/:planId', { schema: { body: updatePlanSchema }, handler: updatePlan })
  app.delete('/:planId', { handler: deletePlan })
}

export default planRoutes
