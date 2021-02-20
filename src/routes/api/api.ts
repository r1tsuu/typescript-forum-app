import express from 'express'
import { userRouter } from './user/user'

export const api = express.Router()

api.use(express.json())

api.use('/user', userRouter)
