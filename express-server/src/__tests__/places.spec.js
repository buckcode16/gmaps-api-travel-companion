import {
  addPlaceHandler,
  getPlaceIdsHandler,
  removePlaceHandler,
} from '../handlers/placeIdsHandlers.mjs'
import { createUserHandler } from '../handlers/users.mjs'
import { User } from '../mongoose/schemas/user.mjs'
import { validationResult, matchedData } from 'express-validator'
import { hashPassword } from '../utils/helpers.mjs'

jest.mock('../mongoose/schemas/user.mjs', () => ({
  User: {
    findByIdAndUpdate: jest.fn(),
    findById: jest.fn(),
    save: jest.fn(),
  },
}))

jest.mock('express-validator', () => ({
  validationResult: jest.fn(),
  matchedData: jest.fn(),
}))

jest.mock('../utils/helpers.mjs', () => ({
  hashPassword: jest.fn().mockReturnValue('hashedPassword'),
}))

describe('Handler Tests', () => {
  describe('addPlaceHandler', () => {
    it('should add a place successfully', async () => {
      const req = {
        user: { _id: 'userId' },
        body: { place_id: 'placeId' },
      }
      const res = {
        status: jest.fn(() => res),
        send: jest.fn(),
      }

      User.findByIdAndUpdate.mockResolvedValue(true)

      await addPlaceHandler(req, res)

      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.send).toHaveBeenCalledWith({
        message: 'Place added successfully.',
      })
    })
  })

  describe('getPlaceIdsHandler', () => {
    it('should get place ids successfully', async () => {
      const req = { user: { _id: 'userId' } }
      const res = {
        status: jest.fn(() => res),
        send: jest.fn(),
        cookie: jest.fn(),
      }

      User.findById.mockResolvedValue({
        place_ids: [JSON.stringify({ place_id: 'placeId' })],
      })

      await getPlaceIdsHandler(req, res)

      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.send).toHaveBeenCalled()
      expect(res.cookie).toHaveBeenCalled()
    })
  })

  describe('removePlaceHandler', () => {
    it('should remove a place successfully', async () => {
      const req = {
        user: { _id: 'userId' },
        body: { placeId: 'placeId' },
      }
      const res = {
        status: jest.fn(() => res),
        send: jest.fn(),
      }

      User.findById.mockResolvedValue({
        place_ids: [JSON.stringify({ place_id: 'placeId' })],
        save: jest.fn(),
      })

      await removePlaceHandler(req, res)

      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.send).toHaveBeenCalledWith({
        message: 'Place removed successfully.',
      })
    })
  })
})
