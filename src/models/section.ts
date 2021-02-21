import { IModel, Model, query } from './model'

interface ISection extends IModel {
    categoryId: number
    title: string
}

export class Section extends Model implements ISection {
    private _categoryId: number
    private _title: string
    constructor(section: ISection) {
        super()
        /** @private set */
        this._id = section.id
        /** @public set */
        this.categoryId = section.categoryId
        this.title = section.title
    }

    public static async create(title: string, categoryId: number): Promise<Section> {
        try {
            await query('INSERT INTO SECTIONS(title, categoryid) VALUES($1, $2);', [title, categoryId])

            const sectionData = (await query('SELECT * FROM SECTIONS ORDER BY id DESCT LIMIT1;')).rows[0]

            let section: ISection

            section.id = sectionData.id
            section.categoryId = sectionData.categoryid
            section.title = sectionData.title

            return new Section(section)
        } catch (error) {
            console.log(error)
        }
    }

    public get categoryId() {
        return this._categoryId
    }

    public set categoryId(value: number) {
        this._categoryId = value
    }

    public get title() {
        return this._title
    }

    public set title(value: string) {
        this._title = value
    }
}
