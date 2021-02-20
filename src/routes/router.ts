import express from 'express'
import { api } from './api/api'
export const router = express.Router()

router.use('/api', api)
