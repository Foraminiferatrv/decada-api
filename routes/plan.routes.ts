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
  app.get('/', { schema: planSchema, onRequest: app.verifySession, handler: getAllPlans })
  app.put('/create', {
    schema: { body: createPlanSchema },
    onRequest: app.verifySession,
    handler: createPlan,
  })
  app.get('/:planId', { onRequest: app.verifySession, handler: getPlan })
  app.patch('/:planId', {
    schema: { body: updatePlanSchema },
    onRequest: app.verifySession,
    handler: updatePlan,
  })
  app.delete('/:planId', { onRequest: app.verifySession, handler: deletePlan })
}

export default planRoutes
