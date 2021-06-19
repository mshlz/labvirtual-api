import jwt from 'jsonwebtoken'
import { UnauthorizedError } from 'routing-controllers'
import { JWT_SECRET } from '../config/env'
import { Admin, IAdmin } from '../models/Admin'
import { IUser, User } from '../models/User'
import { ResetTokenService } from './ResetTokenService'

export class AuthService {
    public async login(data): Promise<{ token: string, user: object }> {
        // validate
        const user = await User.findOne({ email: data.email })
        console.log(user)
        if (!user || !user.checkPassword(data.password)) {
            throw new UnauthorizedError('Email / Senha incorretos')
        }

        const token = jwt.sign({ user: user.id, type: user.type }, JWT_SECRET, { expiresIn: '24h' })

        return {
            token, user: {
                name: user.name,
                email: user.email,
                type: user.type
            }
        }
    }

    public async register(data): Promise<IUser | IAdmin> {
        let user = null
        if (data.type === 'admin') {
            user = await Admin.create(data)
        }
        else {
            user = await User.create(data)
        }
        return user.toPublicJSON()
    }

    public async generateResetToken(data) {
        let user = await User.findOne({ email: data.email })

        if (!user) {
            throw new Error("User not found")
        }

        const resetToken = await ResetTokenService.create(user.id)

        return { token: resetToken.token }
    }

    public async resetPassword(data) {
        let token = await ResetTokenService.use(data.token)

        if (!token) {
            throw new Error("Token not found")
        }

        const user = await User.findOne({_id: token.parent})

        if(user) {
            user.password = data.password
            await user.save()
        }

        return { updated: !!user }
    }

}
