import { User } from '../src/models/user'

async function createUser() {
    if (!await User.create("asdf", "asda@mail.asd", "asdasda")) {
        console.log(2)
    }
}

createUser()
