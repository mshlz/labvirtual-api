import jwt from 'jsonwebtoken'
import { NotFoundError, UnauthorizedError } from 'routing-controllers'
import { JWT_SECRET } from '../../../config/env'
import { EmailService } from '../../../services/EmailService'
import { BadRequestError } from '../../../utils/http/responses'
import { ResetTokenService } from '../ResetToken/ResetTokenService'
import { tokenService } from '../Token/TokenService'
import { IUser, User, UserType } from '../User/User'
import { userService } from '../User/UserService'

export class AuthService {
    public async login(login: string, password: string, extendSession?: boolean) {
        const user = await User.findOne({ email: login }).select('+password')

        if (!user || !user.checkPassword(password)) {
            throw new UnauthorizedError('Email / Senha incorretos')
        }

        const token = jwt.sign({ user: user._id, type: user.type }, JWT_SECRET, { expiresIn: extendSession ? '30d' : '24h' })

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
        const activationToken = await tokenService.createNumberToken('ACCOUNT_CONFIRM', result._id)

        // TODO: REFACTOR TO USE QUEUE/JOB
        // TODO: create template system
        EmailService.send({
            to: result.email,
            subject: 'Ative sua conta do Laboratório Virtual',
            message: {
                text: `Olá ${result.name}, o código de confirmação de sua conta é: ${activationToken.token}`,
                html: `
                <p>Olá ${result.name},</p>
                <p>Você criou uma conta no Laboratório Virtual, e para ter acesso você deve confirmar sua conta.</p>
                <p>
                <p>O código de confirmação de sua conta é:</p>
                <p style="font-weight:bold;font-size:18px;">${activationToken.token}</p>
                `
            }
        }).catch(r => console.log(r))

        return result
    }

    public async confirmAccount(userId: string, token: string) {
        const confirmToken = await tokenService.use(token, 'ACCOUNT_CONFIRM', userId)

        if (!confirmToken) {
            throw new BadRequestError('Invalid token')
        }

        const user = await User.findOne({ _id: confirmToken.parentId })

        if (!user) {
            throw new NotFoundError('User not found')
        }

        user.active = true
        await user.save()

        return true
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
            throw new NotFoundError('Token not found')
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
