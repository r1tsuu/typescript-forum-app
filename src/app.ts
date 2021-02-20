import express from 'express'
import { config } from './config/index'
import { router } from './routes/router'

const app = express()

app.use(router)

app.listen(config.SERVER_PORT)

console.log(`Server has started, port: ${config.SERVER_PORT}`)
