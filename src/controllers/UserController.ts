import { Body, Delete, Get, JsonController, Param, Post } from "routing-controllers";
import { ApiResponse } from "../interfaces/ApiResponse";
import { IUser } from "../models/User";
import { UserService } from "../services/user/UserService";
import { UserFromSession } from "../utils/decorators/UserFromSession";
import { Validate, Yup } from "../utils/validator/Validator";

@JsonController('/users/')
export class UserController {
    @Get('me')
    public async me(@UserFromSession() user: IUser): Promise<ApiResponse> {
        return { data: user.toPublicJSON() }
    }

    @Post('update')
    @Validate({
        name: Yup.string().trim().min(3),
        email: Yup.string().email()
    })
    public async update(@Body() data: any, @UserFromSession() user: IUser): Promise<ApiResponse> {
        if (user.type != 'admin') delete data.type

        const service = new UserService()
        return { data: await service.update(user._id, data) }
    }

    @Delete(':id')
    public async delete(@Param('id') id: string, @UserFromSession() user: IUser): Promise<ApiResponse> {
        if (user.type != 'admin') { } // TODO permission

        return { data: await (new UserService()).delete(id) }
    }

}