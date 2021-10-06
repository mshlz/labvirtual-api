import jwt from 'jsonwebtoken'
import { UnauthorizedError } from 'routing-controllers'
import { JWT_SECRET } from '../../../config/env'
import { ResetTokenService } from '../ResetToken/ResetTokenService'
import { IUser, User } from '../User/User'

export class AuthService {
    public async login(data): Promise<{ token: string, user: Record<string, unknown> }> {
        // validate
        const user = await User.findOne({ email: data.email })
        console.log(user)
        if (!user || !user.checkPassword(data.password)) {
            throw new UnauthorizedError('Email / Senha incorretos')
        }

        const token = jwt.sign({ user: user.id, type: user.type }, JWT_SECRET, { expiresIn: '24h' })

        return {
            token, user: {
                id: user._id,
                name: user.name,
                email: user.email,
                type: user.type
            }
        }
    }

    public async register(data): Promise<IUser> {
        let user = null
        user = await User.create(data)
        
        return user.toPublicJSON()
    }

    public async generateResetToken(data) {
        const user = await User.findOne({ email: data.email })

        if (!user) {
            throw new Error('User not found')
        }

        const resetToken = await ResetTokenService.create(user.id)

        return { token: resetToken.token }
    }

    public async resetPassword(data) {
        const token = await ResetTokenService.use(data.token)

        if (!token) {
            throw new Error('Token not found')
        }

        const user = await User.findOne({_id: token.parent})

        if(user) {
            user.password = data.password
            await user.save()
        }

        return { updated: !!user }
    }

}

export const authService = new AuthService()
