import { User } from './User'
import { BaseResourceService } from '../../Base/BaseService'

export class UserService extends BaseResourceService {
    constructor() { super(User) }
}

export const userService = new UserService()
