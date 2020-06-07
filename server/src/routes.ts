import { Router } from 'express'

import multer from 'multer'
import multerConfig from './config/multer'

import ItemController from './controller/ItemController'
import PointController from './controller/PointController'

// Variables
const routes = Router()

const upload = multer(multerConfig)

const itemController = new ItemController()
const pointController = new PointController()

// Point Routes
routes.get('/point', pointController.index)
routes.get('/point/:id', pointController.show)

routes.post('/point', upload.single('image'), pointController.create)

// Item Routes
routes.get('/item', itemController.index)

// Multer Route

export default routes
