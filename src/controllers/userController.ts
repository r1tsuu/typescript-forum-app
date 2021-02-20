import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { User } from '../models/user'
import { Controller } from './controller'
import { utils } from './lib/utils'
import { config } from '../config/index'

let register: Controller

let login: Controller

// eslint-disable-next-line prefer-const
register = async (request: express.Request, response: express.Response): Promise<void> => {
    console.log(request.body)
    try {
        const username: string = request.body.username
        const email: string = request.body.email
        const password: string = request.body.password
        if (!utils.registerValidate(response, username, email, password)) {
            return
        }
        if (await User.find(username)) {
            response.status(200).json({ status: 'username exists' })
            return
        }
        if (await User.doesEmailExists(email)) {
            response.status(200).json({ status: 'email exists' })
            return
        }
        const passwordHashed = await bcrypt.hash(password, 8)
        await User.create(username, email, passwordHashed)
        response.json({ status: 'success' })
    } catch (error) {
        if (error instanceof TypeError) {
            response.status(400).json({ status: 'invalid request' })
            return
        }
        console.log(error)
        response.status(500).json({ status: 'server error' })
    }
}

// eslint-disable-next-line prefer-const
login = async (request: express.Request, response: express.Response): Promise<void> => {
    try {
        const username: string = request.body.username
        const password: string = request.body.password
        const user = await User.find(username)
        if (!user) {
            response.status(200).json({ status: 'username does not exists' })
            return
        }
        if (!await bcrypt.compare(password, user.getPassword())) {
            response.status(200).json({ status: 'invalid password' })
            return
        }
        const authToken = jwt.sign({ uid: user.getId(), isSuperUser: user.getIsSuperUser() }, config.SECRET_TOKEN)
        response.status(200).json({ status: 'success', authToken: authToken })
    } catch (error) {
        if (error instanceof TypeError) {
            response.status(400).json({ status: 'invalid request' })
            return
        }
        console.log(error)
        response.status(500).json({ status: 'server error' })
    }
}

export const userController = {
    register,
    login
}
