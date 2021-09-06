import { Body, JsonController, Post } from 'routing-controllers'
import { ApiResponse } from '../../../interfaces/ApiResponse'
import { Validate } from '../../../utils/validator/Validator'
import { AuthService } from './AuthService'
import rules from './validation/rules'

@JsonController('/auth/')
export class AuthController {
    @Post('login')
    @Validate(rules.onLogin)
    public async login(@Body() data: any): Promise<ApiResponse> {
        const service = new AuthService()
        return { data: await service.login(data) }
    }

    @Post('register')
    @Validate(rules.onRegister)
    public async register(@Body() data: any): Promise<ApiResponse> {
        const service = new AuthService()
        return { data: await service.register(data) }
    }

    @Post('forgot-password')
    @Validate(rules.onForgotPassword)
    public async generateResetToken(@Body() data: any): Promise<ApiResponse> {
        const service = new AuthService()
        const result = await service.generateResetToken({ email: data.email })

        // send mail
        console.log('RESET TOKEN: ', result.token)

        return { data: true }
    }

    @Post('reset-password')
    @Validate(rules.onResetPassword)
    public async resetPassword(@Body() data: any): Promise<ApiResponse> {
        const service = new AuthService()
        const result = await service.resetPassword(data)

        return { data: result }
    }

}