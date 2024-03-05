import express from 'express'
import routes from './routes/index.mjs'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import passport from 'passport'
import MongoStore from 'connect-mongo'
import mongoose from 'mongoose'
import './strategies/local-strategy.mjs'
import cors from 'cors'

export function createApp() {
  const app = express()
  app.use(
    cors({
      origin: 'http://localhost:5173',
      credentials: true,
    }),
  )
  app.use(express.json())
  app.use(cookieParser('cookie'))
  app.use(
    session({
      secret: 'secret',
      saveUninitialized: true,
      resave: false,
      cookie: {
        maxAge: 60000 * 60,
        secure: false,
        httpOnly: true,
      },
      store: MongoStore.create({
        client: mongoose.connection.getClient(),
      }),
    }),
  )

  app.use(passport.initialize())
  app.use(passport.session())

  app.use(routes)

  return app
}
