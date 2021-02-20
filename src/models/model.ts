import { Pool, QueryResult } from 'pg'
import { config } from '../config/index'

const pool = new Pool({
    database: config.DB_NAME
})

export interface IModel {
    id: number
}

export abstract class Model implements IModel {
    id: number

    /** Create object in database */
    public static async create(...args:any): Promise<any> {

    }

    /** Find object in database by some params */
    public static async find(...args:any): Promise<any> {

    }

    /** Delete object in database by some params */
    public static async delete(...args:any): Promise<any> {

    }

    /** Update class object values in database */
    public async update(): Promise<void> {

    }

    public getId(): number {
        return this.id
    }
}

export async function query(query: string, values: Array<any>) : Promise<QueryResult<any>> {
    const client = await pool.connect()
    try {
        return await client.query(query, values)
    } catch (error) {
        console.log(error)
    } finally {
        client.release()
    }
}
