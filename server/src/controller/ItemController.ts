import { Request, Response } from 'express'
import knex from '../database/connection'

class ItemController {
  public async index (req: Request, res: Response): Promise<Response> {
    const items = await knex('item').select('*')
    const serialidedItems = items.map(item => {
      return {
        id: item.id,
        title: item.title,
        image_url: `http://${process.env.IP}:${process.env.PORT}/uploads/${item.image}`
      }
    })

    return res.json(serialidedItems)
  }
}

export default ItemController
