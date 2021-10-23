import { Body, Delete, Get, JsonController, Param, Post } from 'routing-controllers'
import { ApiResponse } from '../../../interfaces/ApiResponse'
import { UserFromSession } from '../../../utils/decorators/UserFromSession'
import { BadRequestError, success } from '../../../utils/http/responses'
import { Validate } from '../../../utils/validator/Validator'
import { IUser } from './User'
import { userService } from './UserService'
import rules from './validation/rules'

@JsonController('/users/')
export class UserController {
    @Get('profile')
    public async profile(@UserFromSession() user: IUser): Promise<ApiResponse> {
        return success(user)
    }

    @Post('update')
    @Validate(rules.onUpdate)
    public async update(@Body() data: any, @UserFromSession() user: IUser): Promise<ApiResponse> {
        if (user.type !== 'ADMIN') delete data.type

        return success(await userService.update(user._id, data))
    }

    @Delete(':id')
    public async delete(@Param('id') id: string, @UserFromSession() user: IUser): Promise<ApiResponse> {
        if (user.type !== 'ADMIN')
            throw new BadRequestError('Ops! Você não tem permissão')

        return success(await userService.delete(id))
    }

}