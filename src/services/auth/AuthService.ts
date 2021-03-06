import * as jwt from 'jsonwebtoken'
import { UnauthorizedError } from 'routing-controllers'
import { JWT_SECRET } from '../../config/env'
import { IUser, User } from '../../models/User'

interface LoginData {
    email: string
    password: string
    type: string
}

export class AuthService {
    public async login(data: LoginData): Promise<{ token: string }> {
        // validate
        const user = await User.findOne({ email: data.email, type: data.type })
        console.log(user)
        if (!user || !user.checkPassword(data.password)) {
            throw new UnauthorizedError('Authentication Error')
        }

        const token = jwt.sign({ user: user.id, type: data.type }, JWT_SECRET, { expiresIn: '2h' })

        return { token }
    }

    public async register(data): Promise<IUser | any> {
        const user = await User.create(data)
        return true
    }
}
