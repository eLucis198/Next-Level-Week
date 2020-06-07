import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'

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

routes.post('/point',
  upload.single('image'),
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      whatsapp: Joi.number().required(),
      latitude: Joi.number().required(),
      longitude: Joi.number().required(),
      city: Joi.string().required(),
      uf: Joi.string().required().max(2),
      items: Joi.string().required()
    })
  }, {
    abortEarly: false
  }),
  pointController.create
)

// Item Routes
routes.get('/item', itemController.index)

// Multer Route

export default routes
