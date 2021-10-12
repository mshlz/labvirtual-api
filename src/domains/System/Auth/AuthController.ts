import { Body, JsonController, Post } from 'routing-controllers'
import { ApiResponse } from '../../../interfaces/ApiResponse'
import { Validate } from '../../../utils/validator/Validator'
import { authService } from './AuthService'
import rules from './validation/rules'

@JsonController('/auth/')
export class AuthController {
    @Post('login')
    @Validate(rules.onLogin)
    public async login(@Body() data: any): Promise<ApiResponse> {
        return { data: await authService.login(data.email, data.password) }
    }

    @Post('register')
    @Validate(rules.onRegister)
    public async register(@Body() data: any): Promise<ApiResponse> {
        const userType = data.type === 'teacher' ? 'TEACHER' : 'STUDENT'
        delete data.type

        return { data: await authService.register(data, userType) }
    }

    @Post('forgot-password')
    @Validate(rules.onForgotPassword)
    public async forgotPassword(@Body() data: any): Promise<ApiResponse> {
        const resetToken = await authService.generateResetToken(data.email)

        // TODO: send mail
        console.log('RESET TOKEN: ', resetToken.token)

        return { data: true }
    }

    @Post('reset-password')
    @Validate(rules.onResetPassword)
    public async resetPassword(@Body() data: any): Promise<ApiResponse> {
        const result = await authService.resetPassword(data.token, data.password)

        return { data: result }
    }

}