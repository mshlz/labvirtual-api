import jwt from 'jsonwebtoken'
import { NotFoundError, UnauthorizedError } from 'routing-controllers'
import { JWT_SECRET } from '../../config/env'
import { EmailService } from '../../services/EmailService'
import { BadRequestError } from '../../utils/http/responses'
import { getNanoIdAsync } from '../../utils/nanoid'
import { tokenService } from '../Token/TokenService'
import { IUser, User, UserType } from '../User/User'
import { userService } from '../User/UserService'

export class AuthService {
    public async login(login: string, password: string, extendSession?: boolean) {
        const user = await User.findOne({ email: login }).select('+password')

        if (!user || !user.checkPassword(password)) {
            throw new UnauthorizedError('Email / Senha incorretos')
        }

        const token = jwt.sign({ user: user._id, type: user.type, permission: user.permission }, JWT_SECRET, { expiresIn: extendSession ? '30d' : '24h' })

        return {
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                type: user.type,
                permission: user.permission,
            }
        }
    }

    public async register(data: IUser, userType: UserType) {
        const result = await userService.create(data, userType, { role: "STUDENT" })

        const code = await getNanoIdAsync(6, { onlyNumbers: true })
        const activationToken = await tokenService.createToken('ACCOUNT_CONFIRM', code, result._id)

        // TODO: REFACTOR TO USE QUEUE/JOB
        // TODO: create template system
        EmailService.send({
            to: result.email,
            subject: 'Ative sua conta do Laboratório Virtual',
            message: {
                text: `Olá ${result.name}, o código de confirmação de sua conta é: ${code}`,
                html: `
                <p>Olá ${result.name},</p>
                <p>Você criou uma conta no Laboratório Virtual, e para ter acesso você deve confirmar sua conta.</p>
                <p>
                <p>O código de confirmação de sua conta é:</p>
                <p style="font-weight:bold;font-size:18px;">${code}</p>
                `
            }
        }).catch(r => console.log(r))

        return { user: result, tokenId: activationToken.id }
    }

    public async confirmAccount(userId: string, tokenId: string, code: string) {
        const confirmToken = await tokenService.use(tokenId, code, 'ACCOUNT_CONFIRM', userId)

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
        const user = await User.findOne({ email }).select('_id name email')

        if (!user) {
            throw new NotFoundError('User not found')
        }

        let resetToken = await tokenService.findOne('RESET_PASSWORD', user._id)

        if (!resetToken) {
            const code = await getNanoIdAsync(6, { onlyNumbers: true })
            const expire = new Date(Date.now() + (5 * 60 * 1000)) /* 5 minutes */
            resetToken = await tokenService.createToken('RESET_PASSWORD', code, user._id, null, expire)
        }

        // TODO: REFACTOR TO USE QUEUE/JOB
        // TODO: create template system
        EmailService.send({
            to: user.email,
            subject: 'Recuperação de conta do Laboratório Virtual',
            message: {
                text: `Olá ${user.name}, o código de recuperação de sua conta é: ${resetToken.token}`,
                html: `
                <p>Olá ${user.name},</p>
                <p>Você iniciou o processo de recuperação de sua conta do Laboratório Virtual, insira o código abaixo para recuperá-la.</p>
                <p>
                <p>O código de recuperação de sua conta é:</p>
                <p style="font-weight:bold;font-size:18px;">${resetToken.token}</p>
                `
            }
        }).catch(r => console.log(r))

        return resetToken
    }

    public async resetPassword(tokenId: string, code: string, newPassword: string) {
        const resetToken = await tokenService.use(tokenId, code, 'RESET_PASSWORD')

        if (!resetToken) {
            throw new NotFoundError('Token not found')
        }

        const user = await User.findOne({ _id: resetToken.parentId })

        if (user) {
            user.password = newPassword
            await user.save()
        }

        return !!user
    }
}

export const authService = new AuthService()
