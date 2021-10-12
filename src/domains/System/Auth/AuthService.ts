import jwt from 'jsonwebtoken'
import { NotFoundError, UnauthorizedError } from 'routing-controllers'
import { JWT_SECRET } from '../../../config/env'
import { ResetTokenService } from '../ResetToken/ResetTokenService'
import { IUser, User, UserType } from '../User/User'
import { userService } from '../User/UserService'

export class AuthService {
    public async login(login: string, password: string) {
        const user = await User.findOne({ email: login })
        
        if (!user || !user.checkPassword(password)) {
            throw new UnauthorizedError('Email / Senha incorretos')
        }

        const token = jwt.sign({ user: user._id, type: user.type }, JWT_SECRET, { expiresIn: '24h' })

        return {
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                type: user.type
            }
        }
    }

    public async register(data: any, userType: UserType): Promise<IUser> {
        const result = await userService.create(data, userType)

        return result
    }

    public async generateResetToken(email: string) {
        const user = await User.findOne({ email }).select('_id')

        if (!user) {
            throw new NotFoundError('User not found')
        }

        const resetToken = await ResetTokenService.create(user._id)

        return { token: resetToken.token }
    }

    public async resetPassword(token: string, newPassword: string) {
        const resetToken = await ResetTokenService.use(token)

        if (!resetToken) {
            throw new Error('Token not found')
        }

        const user = await User.findOne({ _id: resetToken.userId })

        if (user) {
            user.password = newPassword
            await user.save()
        }

        return !!user
    }
}

export const authService = new AuthService()
