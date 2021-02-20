import { IModel, query } from './model'

interface ICategory extends IModel {
    getTitle(): string,
    setTitle(title: string): void
}

export class Category implements ICategory {
    private id: number
    private title: string

    public async update() {

    }

    public getId(): number {
        return this.id
    }

    public getTitle(): string {
        return this.title
    }

    public setTitle(title: string) {
        this.title = title
    }
}
