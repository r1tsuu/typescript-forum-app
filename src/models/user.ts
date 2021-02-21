import { Model, IModel, query } from './model'

interface IUser extends IModel {
    rating: number

    username: string
    email: string
    password: string
    registerDate: string

    isSuperuser: boolean
}

/**
 * Model of User
 */
export class User extends Model implements IUser {
    private _rating: number

    private _username: string
    private _email: string
    private _password: string
    private _registerDate: string

    private _isSuperuser: boolean

    constructor(user: IUser) {
        super()
        /** @private set */
        this._id = user.id
        this._registerDate = user.registerDate
        /** @public set */
        this.rating = user.rating
        this.username = user.username
        this.email = user.email
        this.password = user.password
        this.isSuperuser = user.isSuperuser
    }

    public static async create(username: string, email: string, password: string, IsSuperuser = false): Promise<User> {
        try {
            await query('INSERT INTO USERS(username, email, password, isSuperUser, registerDate) VALUES($1, $2, $3, $4, $5);',
                [username, email, password, IsSuperuser, Date.now().toString()])

            const userData = (await query('SELECT * FROM USERS ORDER BY id DESC LIMIT 1;', [])).rows[0]

            let user: IUser

            user.id = userData.id
            user.rating = userData.rating

            user.username = userData.username
            user.email = userData.email
            user.password = userData.password
            user.registerDate = userData.registerDate

            user.isSuperuser = userData.isSuperuser

            return new User(user)
        } catch (error) {
            console.log(error)
        }
    }

    public static async find(username: string): Promise<User> {
        try {
            const userData = (await query('SELECT * FROM USERS WHERE username=$1;', [username])).rows[0]
            if (userData) {
                let user: IUser

                user.id = userData.id
                user.rating = userData.rating

                user.username = userData.username
                user.email = userData.email
                user.password = userData.password
                user.registerDate = userData.registerDate

                user.isSuperuser = userData.isSuperuser

                return new User(user)
            }
            return null
        } catch (error) {
            console.log(error)
        }
    }

    public static async doesEmailExists(email: string): Promise<boolean> {
        try {
            const userData = (await query('SELECT * FROM USERS WHERE email=$1;', [email])).rows[0]
            if (userData) {
                return true
            }
            return false
        } catch (error) {
            console.log(error)
        }
    }

    public static async delete(username: string): Promise<void> {
        try {
            await query('DELETE FROM USERS WHERE username=$1;', [username])
        } catch (error) {
            console.log(error)
        }
    }

    public async update(): Promise<void> {
        if (typeof this.id !== 'number') {
            throw new TypeError('undefined user')
        }
        try {
            await query('UPDATE USERS SET username=$1, email=$2, password=$3, isSuperUser=$4 WHERE id=$5;',
                [this.username, this.email, this.password, this.isSuperuser, this.id])
        } catch (error) {
            console.log(error)
        }
    }

    public get rating(): number {
        return this._rating
    }

    public set rating(value: number) {
        this._rating = value
    }

    public get username(): string {
        return this._username
    }

    public set username(value: string) {
        this._username = value
    }

    public get email(): string {
        return this._email
    }

    public set email(value: string) {
        this._email = value
    }

    public get password(): string {
        return this._password
    }

    public set password(value: string) {
        this._password = value
    }

    public get registerDate(): string {
        return this._registerDate
    }

    public get isSuperuser(): boolean {
        return this._isSuperuser
    }

    public set isSuperuser(value: boolean) {
        this._isSuperuser = value
    }
}
