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
    public rating: number

    public username: string
    public email: string
    public password: string
    public registerDate: string

    public isSuperuser: boolean

    constructor(user: IUser) {
        super()
        this.id = user.id
        this.rating = user.rating
        this.username = user.username
        this.email = user.email
        this.password = user.password
        this.registerDate = user.registerDate
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

    public static async find(username: string):Promise<User> {
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

    /**
     * Set up user after created
     * @private
     */
    private setProps(id: number, username: string, email: string, password: string, registerDate: string, IsSuperuser: boolean): User {
        this.id = id
        this.username = username
        this.email = email
        this.password = password
        this.isSuperuser = IsSuperuser
        this.registerDate = registerDate
        return this
    }

    public getRating(): number {
        return this.rating
    }

    public setRating(rating: number): void {
        this.rating = rating
    }

    public getUsername(): string {
        return this.username
    }

    public setUsername(username: string): void {
        this.username = username
    }

    public getEmail(): string {
        return this.email
    }

    public setEmail(email: string): void {
        this.email = email
    }

    public getPassword(): string {
        return this.password
    }

    public setPassword(password: string): void {
        this.password = password
    }

    public getRegisterDate(): string {
        return this.registerDate
    }

    public getIsSuperuser(): boolean {
        return this.isSuperuser
    }

    public setIsSuperuser(IsSuperuser: boolean): void {
        this.isSuperuser = IsSuperuser
    }
}
