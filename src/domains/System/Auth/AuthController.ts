import { Body, JsonController, Post } from 'routing-controllers'
import { ApiResponse } from '../../../interfaces/ApiResponse'
import { fromRule } from '../../../utils/helpers'
import { success } from '../../../utils/http/responses'
import { Validate } from '../../../utils/validator/Validator'
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
    public async register(@Body() data: fromRule<typeof rules.onRegister>): Promise<ApiResponse> {
        const userType = data.type === 'teacher' ? 'TEACHER' : 'STUDENT'
        delete data.type

        return success(await authService.register(data, userType))
    }

    @Post('confirm-account')
    @Validate(rules.onConfirmAccount)
    public async confirmAccount(@Body() data: fromRule<typeof rules.onConfirmAccount>): Promise<ApiResponse> {
        return success(await authService.confirmAccount(data.user_id, data.token))
    }

    @Post('forgot-password')
    @Validate(rules.onForgotPassword)
    public async forgotPassword(@Body() data: fromRule<typeof rules.onForgotPassword>): Promise<ApiResponse> {
        const resetToken = await authService.generateResetToken(data.email)

        // TODO: send mail
        console.log('RESET TOKEN: ', resetToken.token)

        return success(true)
    }

    @Post('reset-password')
    @Validate(rules.onResetPassword)
    public async resetPassword(@Body() data: fromRule<typeof rules.onResetPassword>): Promise<ApiResponse> {
        return success(await authService.resetPassword(data.token, data.password))
    }

}