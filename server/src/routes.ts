import { Router } from 'express'

import ItemController from './controller/ItemController'
import PointController from './controller/PointController'

const routes = Router()
const itemController = new ItemController()
const pointController = new PointController()

// Point Routes
routes.post('/point', pointController.create)
routes.get('/point', pointController.index)
routes.get('/point/:id', pointController.show)

// Item Routes
routes.get('/item', itemController.index)

export default routes
