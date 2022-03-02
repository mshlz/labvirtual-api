import { Body, Delete, Get, JsonController, Param, Post, QueryParams } from 'routing-controllers'
import { ApiResponse } from '../../interfaces/ApiResponse'
import { UserFromSession } from '../../utils/decorators/UserFromSession'
import { success } from '../../utils/http/responses'
import { Validate } from '../../utils/validator/Validator'
import { IUser } from '../System/User/User'
import { classworkService } from './ClassworkService'
import rules from './validation/rules'

@JsonController('/classworks/')
export class ClassworkController {
    @Get()
    public async list(@QueryParams() query): Promise<ApiResponse> {
        const result = await classworkService.list(query.page, query.per_page)
        return result
    }

    @Post('from/class')
    public async getFromClass(@Body() data, @UserFromSession() user: IUser): Promise<ApiResponse> {
        return success(await classworkService.getFromClassId(data.classId, user))
    }

    @Get(':id')
    public async getOne(@Param('id') id: string): Promise<ApiResponse> {
        return success(await classworkService.get(id))
    }

    @Post()
    @Validate(rules.onCreate)
    public async create(@Body() data: any, @UserFromSession() user: IUser): Promise<ApiResponse> {
        return success(await classworkService.create({...data, author: user._id}))
    }

    @Post(':id')
    @Validate(rules.onUpdate)
    public async update(@Body() data: any, @Param('id') id: string): Promise<ApiResponse> {
        return success(await classworkService.update(id, data))
    }
    
    @Post(':id/publish')
    public async publish(@Body() data: any, @Param('id') id: string): Promise<ApiResponse> {
        return success(await classworkService.publishActivity(id))
    }

    @Delete(':id')
    public async delete(@Param('id') id: string): Promise<ApiResponse> {
        return success(await classworkService.delete(id))
    }

}