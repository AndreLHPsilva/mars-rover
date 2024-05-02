import express from 'express'
import { routerRover } from './rover.routes'

export const routes = express.Router()

routes.use('/rover', routerRover)