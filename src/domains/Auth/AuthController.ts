import { Body, JsonController, Post } from 'routing-controllers'
import { ApiResponse } from '../../interfaces/ApiResponse'
import { fromRule } from '../../utils/helpers'
import { success } from '../../utils/http/responses'
import { Validate } from '../../utils/validator/Validator'
import { tokenService } from '../Token/TokenService'
import { authService } from './AuthService'
import rules from './validation/rules'

@JsonController('/auth/')
export class AuthController {
    @Post('login')
    @Validate(rules.onLogin)
    public async login(@Body() data: fromRule<typeof rules.onLogin>): Promise<ApiResponse> {
        return success(await authService.login(data.email, data.password, data.remember))
    }

    @Post('register')
    @Validate(rules.onRegister)
    public async register(@Body() data: any): Promise<ApiResponse> {
        const userType = data.type === 'teacher' ? 'TEACHER' : 'STUDENT'
        delete data.type

        return success(await authService.register(data, userType))
    }

    @Post('confirm-account')
    @Validate(rules.onConfirmAccount)
    public async confirmAccount(@Body() data: fromRule<typeof rules.onConfirmAccount>): Promise<ApiResponse> {
        return success(await authService.confirmAccount(data.user_id, data.token_id, data.token))
    }

    @Post('forgot-password')
    @Validate(rules.onForgotPassword)
    public async forgotPassword(@Body() data: fromRule<typeof rules.onForgotPassword>): Promise<ApiResponse> {
        const resetToken = await authService.generateResetToken(data.email)

        return success({ tokenId: resetToken.id })
    }

    @Post('check-token')
    @Validate(rules.onCheckToken)
    public async checkResetToken(@Body() data): Promise<ApiResponse> {
        const result = await tokenService.check(data.tokenId, data.code)

        return success(result)
    }

    @Post('reset-password')
    @Validate(rules.onResetPassword)
    public async resetPassword(@Body() data: fromRule<typeof rules.onResetPassword>): Promise<ApiResponse> {
        return success(await authService.resetPassword(data.tokenId, data.code, data.password))
    }

}