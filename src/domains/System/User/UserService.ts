import { BaseResourceService } from '../../Base/BaseService'
import { IUser, User, UserType } from './User'

export class UserService extends BaseResourceService {
    constructor() { super(User) }

    public async create(data: IUser, type?: UserType) {
        const user = new User()
        user.name = data.name
        user.email = data.email
        user.phone = data.phone
        user.birthdate = data.birthdate
        user.password = data.password
        user.school = data.school
        user.type = type || 'STUDENT'
        
        await user.save()

        return {
            ...user.toJSON(),
            password: undefined // TODO: create publicJson() in model
        }
    }
}

export const userService = new UserService()
