import type { FastifyInstance } from 'fastify'

import {
  updateSolutionSchema,
  createSolutionSchema,
  solutionSchema,
  updateSolutionsArraySchema,
} from '../schemas/solution.schema'

import {
  getAllSolutions,
  createSolution,
  deleteSolution,
  getSolution,
  updateSolution,
  updateAllSolutions,
} from '../controllers/solution.controller'

async function solutionRoutes(app: FastifyInstance) {
  app.get('/', { schema: solutionSchema, onRequest: app.verifySession, handler: getAllSolutions })
  app.put('/create', {
    schema: { body: createSolutionSchema },
    onRequest: app.verifySession,
    handler: createSolution,
  })
  app.get('/:solutionId', { handler: getSolution })
  app.patch('/:solutionId', {
    schema: { body: updateSolutionSchema },
    onRequest: app.verifySession,
    handler: updateSolution,
  })
  app.patch('/', {
    schema: { body: updateSolutionsArraySchema },
    onRequest: app.verifySession,
    handler: updateAllSolutions,
  })
  app.delete('/:solutionId', { onRequest: app.verifySession, handler: deleteSolution })
}

export default solutionRoutes
