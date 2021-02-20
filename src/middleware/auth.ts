import express from 'express'
import jwt from 'jsonwebtoken'
import { config } from '../config/index'

export function userAuthMiddleware (request: express.Request, response: express.Response, next: express.NextFunction): void {
    if (!request.body.authToken) {
        response.status(400).json({ status: 'not authorized' })
        return
    }
    try {
        const authToken = jwt.verify(request.body.authToken, config.SECRET_TOKEN)
        next(authToken)
        return
    } catch (error) {
        response.status(400).json({ status: 'not authorized' })
    }
}

export function superuserAuthMiddleware (request: express.Request, response: express.Response, next: express.NextFunction): void {
    if (!request.body.token) {
        response.status(400).json({ status: 'access denied' })
        return
    }
    try {
        const authToken = jwt.verify(request.body.authToken, config.SECRET_TOKEN)
        // eslint-disable-next-line dot-notation
        if (authToken['isSuperUser']) {
            next(authToken)
            return
        }
        response.status(400).json({ status: 'access denied' })
    } catch (error) {
        response.status(400).json({ status: 'access denied' })
    }
}
