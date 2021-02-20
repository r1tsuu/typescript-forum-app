import express from 'express'

function registerValidate (response: express.Response, username: string, email: string, password: string): boolean {
    if (username.length < 3 || username.length > 30) {
        response.json({ status: 'username length' })
        return false
    }
    if (email.indexOf('@') === -1 || email.indexOf('.') === -1 || email.length < 3 || email.length > 50) {
        response.json({ status: 'incorrect email' })
        return false
    }
    if (password.length < 6 || password.length > 30) {
        response.json({ status: 'password length' })
        return false
    }
    return true
}

export const utils = {
    registerValidate
}
