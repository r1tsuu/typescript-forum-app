import { User } from '../src/models/user'

async function createUser() {
    if (!await User.create('asdf', 'asda@mail.asd', 'asdasda')) {
        console.log(2)
    }
}

interface IModuleMenuItem{
    name: string
}

class ModuleMenuItem implements IModuleMenuItem {
    private _name: string;
    constructor() {
        this._name = 'name'
    }

    get name() {
        return this._name
    }

    set name(value) {
        this._name = value
    }
}

const j = new ModuleMenuItem()
console.log(j.name)
