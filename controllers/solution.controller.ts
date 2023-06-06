import { v4 as uuidv4 } from 'uuid'

import type { RouteHandler } from 'fastify'
import type {
  TCreateSolution,
  TUpdateSolution,
  TSolution,
  TSolutionsArray,
} from '../schemas/solution.schema'
import { Knex } from 'knex'

export const getAllSolutions: RouteHandler<{ Params: { goalId: string } }> = async function (
  req,
  res,
) {
  const goal_id = req.params.goalId

  const solutions = await this.db('solutions')
    .where({ goal_id: goal_id })
    .orderBy('index')
    .catch((err: Error) => {
      res.code(500).send(err)
      return
    })

  return res.code(200).send(solutions)
}

export const createSolution: RouteHandler<{
  Body: TCreateSolution
  Params: { goalId: string }
}> = async function (req, res) {
  const { solution_name, is_complete, index } = req.body
  const goal_id = req.params.goalId

  const newSolution = {
    solution_id: uuidv4(),
    solution_name: solution_name,
    is_complete: is_complete,
    goal_id: goal_id,
    index: index,
  }

  return this.db<TSolution>('solutions')
    .insert(newSolution)
    .returning('*')
    .then((response) => res.code(201).send(response))
    .catch((err: Error) => {
      res.code(500).send(err)
    })
}

export const getSolution: RouteHandler<{ Params: { solutionId: string } }> = async function (
  req,
  res,
) {
  const solution_id = req.params.solutionId

  const solution = await this.db<TSolution>('solutions')
    .where({ solution_id: solution_id })
    .first()
  if (!solution) {
    res.code(404).send(() => new Error("Such solution doesn't exist"))
  }

  return res.code(200).send(solution)
}

export const updateSolution: RouteHandler<{
  Body: TUpdateSolution
  Params: { solutionId: string }
}> = async function (req, res) {
  const solution_id = req.params.solutionId
  const { solution_name, is_complete, index } = req.body

  const newSolution = {
    solution_name: solution_name,
    is_complete: is_complete,
    index: index,
  }

  const solutions = this.db<TSolution>('solutions')

  const solution = solutions
    .where({ solution_id: solution_id })
    .first()
    .catch(() => res.code(500).send(new Error('Internal database error!')))

  if (!solution) {
    return res.code(404).send(new Error("There's no such solution."))
  }

  return await solutions
    .where({ solution_id: solution_id })
    .update(newSolution)
    .returning('*')
    .then((result) => res.code(200).send(result))
    .catch(() => res.code(500).send(new Error('Internal database error!')))
}

export const updateAllSolutions: RouteHandler<{
  Params: { goalId: string }
  Body: TSolutionsArray
}> = async function (req, res) {
  const goal_id = req.params.goalId
  const updatedSolutions = req.body

  const queries: Knex.QueryBuilder<TSolution>[] = []

  updatedSolutions.forEach((solution) => {
    const query = this.db<TSolution>('solutions')
      .where({
        solution_id: solution.solution_id,
      })
      .update({ ...solution })
    queries.push(query)
  })

  return Promise.all(queries)
    .then(() =>
      this.db<TSolution>('solutions')
        .where({
          goal_id: goal_id,
        })
        .orderBy('index'),
    )
    .then((result) => res.code(200).send(result))
    .catch(() => res.code(500).send(new Error('Internal database error!')))
}

export const deleteSolution: RouteHandler<{ Params: { solutionId: string } }> = async function (
  req,
  res,
) {
  const { solutionId } = req.params
  const solutions = this.db<TSolution>('solutions')

  const solution = await solutions
    .where('solution_id', solutionId)
    .first()
    .catch(() => res.code(500).send(new Error('Internal database error!')))

  if (!solution) {
    return res.code(404).send(new Error("There's no such solution."))
  }

  return solutions
    .where('solution_id', solutionId)
    .del()
    .then(() => res.code(200).send({ message: 'Solution has been deleted.' }))
    .catch(() => res.code(500).send(new Error('Internal database error!')))
}
