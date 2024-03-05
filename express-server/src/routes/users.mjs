import { Router } from 'express'

import { checkSchema } from 'express-validator'
import { createUserValidationSchema } from '../utils/validationSchemas.mjs'
import { createUserHandler } from '../handlers/users.mjs'
import {
  addPlaceHandler,
  getPlaceIdsHandler,
  removePlaceHandler,
} from '../handlers/placeIdsHandlers.mjs'

const router = Router()

router.post(
  '/api/users',
  checkSchema(createUserValidationSchema),
  createUserHandler,
)

router.post('/api/place/add', addPlaceHandler)
router.get('/api/place', getPlaceIdsHandler)
router.delete('/api/place/remove', removePlaceHandler)
export default router
