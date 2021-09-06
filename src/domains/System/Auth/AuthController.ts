import { Body, Get, HttpError, JsonController, Param, Post } from "routing-controllers";
import { ApiResponse } from "../../../interfaces/ApiResponse";
import { User } from "../User/User";
import { AuthService } from "./AuthService";
import { Validate, Yup } from "../../../utils/validator/Validator";

@JsonController('/auth/')
export class AuthController {
    @Post('login')
    @Validate({
        email: Yup.string().required().email(),
        password: Yup.string().required()
    })
    public async login(@Body() data: any): Promise<ApiResponse> {
        const service = new AuthService()
        return { data: await service.login(data) }
    }

    @Post('register')
    @Validate({
        name: Yup.string().required(),
        email: Yup.string().required().email(),
        password: Yup.string().required(),
        type: Yup.string().required().oneOf(['teacher', 'student'])
    })
    public async register(@Body() data: any): Promise<ApiResponse> {
        const service = new AuthService()
        return { data: await service.register(data) }
    }

    @Post('forgot-password')
    @Validate({
        email: Yup.string().required().email(),
    })
    public async generateResetToken(@Body() data: any): Promise<ApiResponse> {
        const service = new AuthService()
        const result = await service.generateResetToken({ email: data.email })

        // send mail
        console.log("RESET TOKEN: ", result.token);

        return { data: true }
    }

    @Post('reset-password')
    @Validate({
        token: Yup.string().required(),
        password: Yup.string().required(),
    })
    public async resetPassword(@Body() data: any): Promise<ApiResponse> {
        const service = new AuthService()
        const result = await service.resetPassword(data)

        return { data: result }
    }

    // TODO: rm only for test
    @Get('users')
    public async users(@Body() data: any): Promise<ApiResponse> {
        // body
        return {
            data: await User.find()
        }
    }
}