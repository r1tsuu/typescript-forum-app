import { Pool, QueryResult } from 'pg'
import { config } from '../config/index'

const pool = new Pool({
    database: config.DB_NAME
})

export interface IModel {
    id: number
}

export abstract class Model implements IModel {
    protected _id: number

    /** Create object in database */
    public static async create(...args:any): Promise<any> {
        // Realization
    }

    /** Find object in database by some params and returns object of it class */
    public static async find(...args:any): Promise<any> {
        // Realization
    }

    /** Delete object in database by some params */
    public static async delete(...args:any): Promise<any> {
        // Realization
    }

    /** Update class object values in database */
    public async update(): Promise<void> {
        // Realization
    }

    public get id() {
        return this._id
    }
}

export async function query(query: string, values?: Array<any>) : Promise<QueryResult<any>> {
    const client = await pool.connect()
    try {
        return await client.query(query, values)
    } catch (error) {
        console.log(error)
    } finally {
        client.release()
    }
}
