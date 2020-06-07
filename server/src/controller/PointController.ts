import { Request, Response } from 'express'
import knex from '../database/connection'

class PointController {
  public async index (req: Request, res: Response): Promise<Response> {
    const { city, uf, items } = req.query

    const parsedItems = String(items).split(',').map(item => Number(item.trim()))

    const points = await knex('point')
      .join('point_items', 'point.id', '=', 'point_items.pointId')
      .whereIn('point_items.itemId', parsedItems)
      .where('city', String(city))
      .where('uf', String(uf))
      .distinct()
      .select('point.*')

    const serialidedPoints = points.map(point => {
      return {
        ...point,
        image_url: `http://192.168.0.11:3333/uploads/${point.image}`
      }
    })

    return res.json(serialidedPoints)
  }

  public async show (req: Request, res: Response): Promise<Response> {
    const { id } = req.params

    const point = await knex('point').where('id', id).first()

    if (!point) {
      return res.status(400).json({ message: 'Point not found' })
    }

    const serializedPoint = {
      ...point,
      image_url: `http://192.168.0.11:3333/uploads/${point.image}`
    }

    const items = await knex('item')
      .join('point_items', 'item.id', '=', 'point_items.itemId')
      .where('point_items.pointId', id)
      .select('item.title')

    return res.json({ point: serializedPoint, items })
  }

  public async create (req: Request, res: Response): Promise<Response> {
    const { name, email, whatsapp, latitude, longitude, city, uf, items } = req.body

    const trx = await knex.transaction()

    const point = {
      image: req.file.filename,
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf
    }

    const insertedIds = await trx('point').insert(point)

    const pointId = insertedIds[0]

    const pointItems = items
      .split(',')
      .map((item: string) => Number(item.trim()))
      .map((itemId: number) => {
        return {
          pointId,
          itemId
        }
      })

    await trx('point_items').insert(pointItems)

    await trx.commit()

    return res.json({
      id: pointId,
      ...point
    })
  }
}

export default PointController
