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
  app.get('/', { schema: solutionSchema, handler: getAllSolutions })
  app.put('/create', { schema: { body: createSolutionSchema }, handler: createSolution })
  app.get('/:solutionId', { handler: getSolution })
  app.patch('/:solutionId', { schema: { body: updateSolutionSchema }, handler: updateSolution })
  app.patch('/', { schema: { body: updateSolutionsArraySchema }, handler: updateAllSolutions })
  app.delete('/:solutionId', { handler: deleteSolution })
}

export default solutionRoutes
