import { v4 as uuidv4 } from 'uuid'

import type { RouteHandler } from 'fastify'
import type {
  TCreateObstacle,
  TUpdateObstacle,
  TObstacle,
  TObstaclesArray,
} from '../schemas/obstacle.schema'
import { Knex } from 'knex'

export const getAllObstacles: RouteHandler<{ Params: { goalId: string } }> = async function (
  req,
  res,
) {
  const goal_id = req.params.goalId

  const obstacles = await this.db('obstacles')
    .where({ goal_id: goal_id })
    .orderBy('index')
    .catch((err: Error) => {
      res.code(500).send(err)
      return
    })

  return res.code(200).send(obstacles)
}

export const createObstacle: RouteHandler<{
  Body: TCreateObstacle
  Params: { goalId: string }
}> = async function (req, res) {
  const { obstacle_name, is_complete, index } = req.body
  const goal_id = req.params.goalId

  const newObstacle = {
    obstacle_id: uuidv4(),
    obstacle_name: obstacle_name,
    is_complete: is_complete,
    goal_id: goal_id,
    index: index,
  }

  return this.db<TObstacle>('obstacles')
    .insert(newObstacle)
    .returning('*')
    .then((response) => res.code(201).send(response))
    .catch((err: Error) => {
      res.code(500).send(err)
    })
}

export const getObstacle: RouteHandler<{ Params: { obstacleId: string } }> = async function (
  req,
  res,
) {
  const obstacle_id = req.params.obstacleId

  const obstacle = await this.db<TObstacle>('obstacles').where({ obstacle_id: obstacle_id }).first()
  if (!obstacle) {
    res.code(404).send(() => new Error("Such obstacle doesn't exist"))
  }

  return res.code(200).send(obstacle)
}

export const updateObstacle: RouteHandler<{
  Body: TUpdateObstacle
  Params: { obstacleId: string }
}> = async function (req, res) {
  const obstacle_id = req.params.obstacleId
  const { obstacle_name, is_complete, index } = req.body

  const newObstacle = {
    obstacle_name: obstacle_name,
    is_complete: is_complete,
    index: index,
  }

  const obstacles = this.db<TObstacle>('obstacles')

  const obstacle = obstacles
    .where({ obstacle_id: obstacle_id })
    .first()
    .catch(() => res.code(500).send(new Error('Internal database error!')))

  if (!obstacle) {
    return res.code(404).send(new Error("There's no such obstacle."))
  }

  return await obstacles
    .where({ obstacle_id: obstacle_id })
    .update(newObstacle)
    .returning('*')
    .then((result) => res.code(200).send(result))
    .catch(() => res.code(500).send(new Error('Internal database error!')))
}

export const updateAllObstacles: RouteHandler<{
  Params: { goalId: string }
  Body: TObstaclesArray
}> = async function (req, res) {
  const goal_id = req.params.goalId
  const updatedObstacles = req.body

  const queries: Knex.QueryBuilder<TObstacle>[] = []

  updatedObstacles.forEach((obstacle) => {
    const query = this.db<TObstacle>('obstacles')
      .where({
        obstacle_id: obstacle.obstacle_id,
      })
      .update({ ...obstacle })
    queries.push(query)
  })

  return Promise.all(queries)
    .then(() =>
      this.db<TObstacle>('obstacles')
        .where({
          goal_id: goal_id,
        })
        .orderBy('index'),
    )
    .then((result) => res.code(200).send(result))
    .catch(() => res.code(500).send(new Error('Internal database error!')))
}

export const deleteObstacle: RouteHandler<{ Params: { obstacleId: string } }> = async function (
  req,
  res,
) {
  const { obstacleId } = req.params
  const obstacles = this.db<TObstacle>('obstacles')

  const obstacle = await obstacles
    .where('obstacle_id', obstacleId)
    .first()
    .catch(() => res.code(500).send(new Error('Internal database error!')))

  if (!obstacle) {
    return res.code(404).send(new Error("There's no such obstacle."))
  }

  return obstacles
    .where('obstacle_id', obstacleId)
    .del()
    .then(() => res.code(200).send({ message: 'Obstacle has been deleted.' }))
    .catch(() => res.code(500).send(new Error('Internal database error!')))
}
