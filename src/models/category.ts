import { IModel, Model, query } from './model'

interface ICategory extends IModel {
    title: string
}

export class Category extends Model implements ICategory {
    private _title: string

    constructor(category: ICategory) {
        super()
        /** @private set */
        this._id = category.id
        /** @public set */
        this.title = category.title
    }

    public static async create(title: string): Promise<Category> {
        try {
            await query('INSERT INTO categories(title) VALUES($1);', [title])
            const categoryData = (await query('SELECT * FROM categories ORDER by id DESC LIMIT 1')).rows[0]

            let category: ICategory
            category.title = categoryData.title

            return new Category(category)
        } catch (error) {
            console.log(error)
        }
    }

    public static async find(title: string): Promise<Category> {
        try {
            const categoryData = (await query('SELECT * FROM categories WHERE title=$1;', [title])).rows[0]

            let category: ICategory
            category.title = categoryData.title

            return new Category(category)
        } catch (error) {
            console.log(error)
        }
    }

    public static async delete(title: string): Promise<void> {
        try {
            await query('DELETE FROM CATEGORIES WHERE title=$1', [title])
        } catch (error) {
            console.log(error)
        }
    }

    public async update(): Promise<void> {
        try {
            await query('UPDATE CATEGORIES SET title=$1 WHERE id=$2;', [this.id])
        } catch (error) {
            console.log(error)
        }
    }

    public get title() {
        return this._title
    }

    public set title(value: string) {
        this._title = value
    }
}