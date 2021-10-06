import { Body, Delete, Get, JsonController, Param, Post } from 'routing-controllers'
import { ApiResponse } from '../../../interfaces/ApiResponse'
import { UserFromSession } from '../../../utils/decorators/UserFromSession'
import { Validate } from '../../../utils/validator/Validator'
import { IUser } from './User'
import { userService } from './UserService'
import rules from './validation/rules'

@JsonController('/users/')
export class UserController {
    @Get('me')
    public async me(@UserFromSession() user: IUser): Promise<ApiResponse> {
        return { data: user.toPublicJSON() }
    }

    @Post('update')
    @Validate(rules.onUpdate)
    public async update(@Body() data: any, @UserFromSession() user: IUser): Promise<ApiResponse> {
        if (user.type != 'admin') delete data.type

        return { data: await userService.update(user._id, data) }
    }

    @Delete(':id')
    public async delete(@Param('id') id: string): Promise<ApiResponse> {


        return { data: await userService.delete(id) }
    }

}