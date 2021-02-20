import express from 'express'

export interface Controller {
    (request: express.Request, response: express.Response): Promise<void>
}

export interface AuthController {
    (authToken: object, request: express.Request, response: express.Response)
}
