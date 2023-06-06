import { v4 as uuidv4 } from 'uuid'

import type { RouteHandler } from 'fastify'
import type {
  TCreateCondition,
  TUpdateCondition,
  TCondition,
  TConditionsArray,
} from '../schemas/condition.schema'
import { Knex } from 'knex'

export const getAllConditions: RouteHandler<{ Params: { goalId: string } }> = async function (
  req,
  res,
) {
  const goal_id = req.params.goalId

  const conditions = await this.db('conditions')
    .where({ goal_id: goal_id })
    .orderBy('index')
    .catch((err: Error) => {
      res.code(500).send(err)
      return
    })

  return res.code(200).send(conditions)
}

export const createCondition: RouteHandler<{
  Body: TCreateCondition
  Params: { goalId: string }
}> = async function (req, res) {
  const { condition_name, is_complete, index } = req.body
  const goal_id = req.params.goalId

  const newCondition = {
    condition_id: uuidv4(),
    condition_name: condition_name,
    is_complete: is_complete,
    goal_id: goal_id,
    index: index,
  }

  return this.db<TCondition>('conditions')
    .insert(newCondition)
    .returning('*')
    .then((response) => res.code(201).send(response))
    .catch((err: Error) => {
      res.code(500).send(err)
    })
}

export const getCondition: RouteHandler<{ Params: { conditionId: string } }> = async function (
  req,
  res,
) {
  const condition_id = req.params.conditionId

  const condition = await this.db<TCondition>('conditions')
    .where({ condition_id: condition_id })
    .first()
  if (!condition) {
    res.code(404).send(() => new Error("Such condition doesn't exist"))
  }

  return res.code(200).send(condition)
}

export const updateCondition: RouteHandler<{
  Body: TUpdateCondition
  Params: { conditionId: string }
}> = async function (req, res) {
  const condition_id = req.params.conditionId
  const { condition_name, is_complete, index } = req.body

  const newCondition = {
    condition_name: condition_name,
    is_complete: is_complete,
    index: index,
  }

  const conditions = this.db<TCondition>('conditions')

  const condition = conditions
    .where({ condition_id: condition_id })
    .first()
    .catch(() => res.code(500).send(new Error('Internal database error!')))

  if (!condition) {
    return res.code(404).send(new Error("There's no such condition."))
  }

  return await conditions
    .where({ condition_id: condition_id })
    .update(newCondition)
    .returning('*')
    .then((result) => res.code(200).send(result))
    .catch(() => res.code(500).send(new Error('Internal database error!')))
}

export const updateAllConditions: RouteHandler<{
  Params: { goalId: string }
  Body: TConditionsArray
}> = async function (req, res) {
  const goal_id = req.params.goalId
  const updatedConditions = req.body

  const queries: Knex.QueryBuilder<TCondition>[] = []

  updatedConditions.forEach((condition) => {
    const query = this.db<TCondition>('conditions')
      .where({
        condition_id: condition.condition_id,
      })
      .update({ ...condition })
    queries.push(query)
  })

  return Promise.all(queries)
    .then(() =>
      this.db<TCondition>('conditions')
        .where({
          goal_id: goal_id,
        })
        .orderBy('index'),
    )
    .then((result) => res.code(200).send(result))
    .catch(() => res.code(500).send(new Error('Internal database error!')))
}

export const deleteCondition: RouteHandler<{ Params: { conditionId: string } }> = async function (
  req,
  res,
) {
  const { conditionId } = req.params
  const conditions = this.db<TCondition>('conditions')

  const condition = await conditions
    .where('condition_id', conditionId)
    .first()
    .catch(() => res.code(500).send(new Error('Internal database error!')))

  if (!condition) {
    return res.code(404).send(new Error("There's no such condition."))
  }

  return conditions
    .where('condition_id', conditionId)
    .del()
    .then(() => res.code(200).send({ message: 'Condition has been deleted.' }))
    .catch(() => res.code(500).send(new Error('Internal database error!')))
}
