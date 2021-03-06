import { ValidationError } from "class-validator";
import { Body, ForbiddenError, HttpError, JsonController, Post, Res } from "routing-controllers";
import { ApiResponse } from "../interfaces/ApiResponse";
import { User } from "../models/User";
import { AuthService } from "../services/auth/AuthService";

@JsonController('/auth/')
export class AuthController {
    @Post('login')
    public async login(@Body() data: any): Promise<ApiResponse> {
        const requiredMissing = ['email', 'password', 'type'].some(e => !data[e])
        if (requiredMissing || !['teacher', 'student'].includes(data.type)) {
            throw new HttpError(422, 'Validation Error ')
        }
        const service = new AuthService()
        return { data: await service.login(data) }
    }

    @Post('register')
    public async register(@Body() data: any): Promise<ApiResponse> {
        // body validation
        const requiredMissing = ['name', 'email', 'password', 'type'].some(e => !data[e])
        if (requiredMissing || !['teacher', 'student'].includes(data.type)) {
            throw new HttpError(422, 'Validation Error ')
        }
        const service = new AuthService()
        return { data: await service.register(data) }
    }
}