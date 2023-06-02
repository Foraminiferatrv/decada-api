import { v4 as uuidv4 } from 'uuid'

import type { RouteHandler } from 'fastify'
import type { TCreateGoal, TUpdateGoal, TGoal } from '../schemas/goal.schema'

export const getAllGoals: RouteHandler<{ Params: { planId: string } }> = async function (req, res) {
  const plan_id = req.params.planId

  const goals = await this.db('goals').where({ plan_id: plan_id })

  return res.code(200).send(goals)
}

export const createGoal: RouteHandler<{ Body: TCreateGoal; Params: { planId: string } }> =
  async function (req, res) {
    const { goal_name, is_complete, is_favorite, priority, due_time } = req.body
    const plan_id = req.params.planId

    const newGoal = {
      goal_id: uuidv4(),
      goal_name: goal_name,
      is_complete: is_complete,
      is_favorite: is_favorite,
      priority: priority,
      due_time: due_time,
      plan_id: plan_id,
    }

    return this.db<TGoal>('goals')
      .insert(newGoal)
      .returning('*')
      .then((response) => res.code(201).send(response))
      .catch((err: Error) => {
        res.code(500).send(err)
      })
  }

export const getGoal: RouteHandler<{ Params: { goalId: string } }> = async function (req, res) {
  const goal_id = req.params.goalId

  const goal = await this.db<TGoal>('goals').where('goal_id', goal_id).first()
  if (!goal) {
    res.code(404).send(() => new Error("Such goal doesn't exist"))
  }

  return res.code(200).send(goal)
}

export const updateGoal: RouteHandler<{ Body: TUpdateGoal; Params: { goalId: string } }> =
  async function (req, res) {
    const goal_id = req.params.goalId
    const { goal_name, is_complete, is_favorite, priority, due_time } = req.body

    const newGoal = {
      goal_name: goal_name,
      is_complete: is_complete,
      is_favorite: is_favorite,
      priority: priority,
      due_time: due_time,
    }

    const goals = this.db<TGoal>('goals')
    const goal = goals
      .where('goal_id', goal_id)
      .first()
      .catch(() => res.code(500).send(new Error('Internal database error!')))

    if (!goal) {
      return res.code(404).send(new Error("There's no such goal."))
    }

    return await goals
      .where('goal_id', goal_id)
      .update(newGoal)
      .returning('*')
      .then((result) => res.code(200).send(result))
      .catch(() => res.code(500).send(new Error('Internal database error!')))
  }

export const deleteGoal: RouteHandler<{ Params: { goalId: string } }> = async function (req, res) {
  const { goalId } = req.params
  const goals = this.db<TGoal>('goals')

  const goal = await goals
    .where('goal_id', goalId)
    .first()
    .catch(() => res.code(500).send(new Error('Internal database error!')))

  if (!goal) {
    return res.code(404).send(new Error("There's no such goal."))
  }

  return goals
    .where('goal_id', goalId)
    .del()
    .then(() => res.code(200).send({ message: 'Goal has been deleted.' }))
    .catch(() => res.code(500).send(new Error('Internal database error!')))
}
