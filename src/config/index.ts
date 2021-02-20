import * as data from '../config.json'

interface Config {
    readonly SECRET_TOKEN: string
    readonly TOKEN_EXPIRATIN_TIME: string
    readonly SERVER_PORT: number
    readonly DB_NAME: string
}

const {
    SECRET_TOKEN,
    TOKEN_EXPIRATIN_TIME,
    SERVER_PORT,
    DB_NAME
} = data

export const config : Config = {
    SECRET_TOKEN,
    TOKEN_EXPIRATIN_TIME,
    SERVER_PORT: SERVER_PORT,
    DB_NAME
}
