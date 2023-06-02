import { v4 as uuidv4 } from 'uuid'

import type { RouteHandler } from 'fastify'
import type { TCreatePlan, TUpdatePlan, TPlan } from '../schemas/plan.schema'

export const getAllPlans: RouteHandler<{ Params: { userId: string } }> = async function (req, res) {
  const user_id = req.params.userId

  const plans = await this.db('plans').where({ user_id: user_id })

  return res.code(200).send(plans)
}

export const createPlan: RouteHandler<{ Body: TCreatePlan; Params: { userId: string } }> =
  async function (req, res) {
    const { plan_name, is_complete } = req.body
    const userId = req.params.userId

    const newPlan = {
      plan_id: uuidv4(),
      plan_name: plan_name,
      user_id: userId,
      is_complete: is_complete,
    }

    return this.db<TPlan>('plans')
      .insert(newPlan)
      .returning('*')
      .then((response) => res.code(201).send(response))
      .catch((err: Error) => {
        res.code(500).send(err)
      })
  }

export const getPlan: RouteHandler<{ Params: { planId: string } }> = async function (req, res) {
  const plan_id = req.params.planId

  const plan = await this.db<TPlan>('plans').where('plan_id', plan_id).first()
  if (!plan) {
    res.code(404).send(() => new Error("Such plan doesn't exist"))
  }

  return res.code(200).send(plan)
}

export const updatePlan: RouteHandler<{ Body: TUpdatePlan; Params: { planId: string } }> =
  async function (req, res) {
    const plan_id = req.params.planId
    const { plan_name, is_complete } = req.body

    const plans = this.db<TPlan>('plans')
    const plan = plans
      .where('plan_id', plan_id)
      .first()
      .catch(() => res.code(500).send(new Error('Internal database error!')))

    if (!plan) {
      return res.code(404).send(new Error("There's no such plan."))
    }

    return await plans
      .where('plan_id', plan_id)
      .update({ plan_name: plan_name, is_complete: is_complete })
      .returning('*')
      .then((result) => res.code(200).send(result))
      .catch(() => res.code(500).send(new Error('Internal database error!')))
  }

export const deletePlan: RouteHandler<{ Params: { planId: string } }> = async function (req, res) {
  const { planId } = req.params
  const plans = this.db<TPlan>('plans')

  const plan = await plans
    .where('plan_id', planId)
    .first()
    .catch(() => res.code(500).send(new Error('Internal database error!')))

  if (!plan) {
    return res.code(404).send(new Error("There's no such plan."))
  }

  return plans
    .where('plan_id', planId)
    .del()
    .then(() => res.code(200).send({ message: 'Plan has been deleted.' }))
    .catch(() => res.code(500).send(new Error('Internal database error!')))
}
