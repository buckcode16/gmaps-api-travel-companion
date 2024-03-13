import * as validator from 'express-validator'
import * as helpers from '../utils/helpers.mjs'
import { hashPassword } from '../utils/helpers.mjs'
import { createUserHandler } from '../handlers/users.mjs'
import { User } from '../mongoose/schemas/user.mjs'

jest.mock('express-validator', () => ({
  validationResult: jest.fn(),
  matchedData: jest.fn(),
}))

jest.mock('../utils/helpers.mjs', () => ({
  hashPassword: jest.fn(),
}))

jest.mock('../mongoose/schemas/user.mjs', () => ({
  User: jest.fn().mockImplementation(() => ({
    save: jest.fn().mockResolvedValue({
      _id: 'newUserId',
      username: 'newUser',
      password: 'hashed_pass',
      displayName: 'New User',
    }),
  })),
}))

const mockUser = {
  _id: 'userId123',
  username: 'testUser',
  displayName: 'Test User',
  password: 'hashed_password',
  place_ids: [],
}

const mockUserWithPlaces = {
  ...mockUser,
  place_ids: ['{"place_id":"1"}', '{"place_id":"2"}'],
}

const mockRequest = (body = {}, user = mockUser) => ({
  body,
  user: { _id: user._id },
})

const mockResponse = () => {
  const res = {}
  res.send = jest.fn().mockReturnValue(res)
  res.status = jest.fn().mockReturnValue(res)
  res.sendStatus = jest.fn().mockReturnValue(res)
  return res
}

describe('User Handlers', () => {
  beforeEach(() => {
    validator.validationResult.mockImplementation(() => ({
      isEmpty: () => false,
      array: () => [{ msg: 'Invalid Field' }],
    }))

    validator.matchedData.mockImplementation(() => ({
      username: 'abc',
      password: 'pass',
      displayName: 'ABC',
    }))

    helpers.hashPassword.mockImplementation((password) => `hashed_${password}`)

    jest.clearAllMocks()
  })

  it('createUserHandler - should return status of 400 when there are validation errors', async () => {
    const req = mockRequest()
    const res = mockResponse()

    await createUserHandler(req, res)

    expect(validator.validationResult).toHaveBeenCalledWith(req)
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.send).toHaveBeenCalledWith([{ msg: 'Invalid Field' }])
  })

  it('createUserHandler - should return status of 201 and the user created', async () => {
    // Setup mock for validationResult to indicate no validation errors
    validator.validationResult.mockImplementation(() => ({
      isEmpty: () => true,
    }))

    // Setup request and response mocks
    const req = {
      body: {
        username: 'newUser',
        password: 'pass',
        displayName: 'New User',
      },
    }
    const res = {
      status: jest.fn(() => res),
      send: jest.fn(),
    }

    // No need to mock User.prototype.save here, it's already handled by the mock setup

    // Call the handler
    await createUserHandler(req, res)

    // Assertions
    expect(hashPassword).toHaveBeenCalledWith('pass')
    // Since the save method is mocked at the instance level, you just verify that the response behaves as expected
    expect(res.status).toHaveBeenCalledWith(201)
    expect(res.send).toHaveBeenCalledWith(expect.anything())
  })
})
