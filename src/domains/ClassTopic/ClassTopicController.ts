import { Body, Delete, Get, JsonController, Param, Post, QueryParams } from 'routing-controllers'
import { ApiResponse } from '../../interfaces/ApiResponse'
import { Authorized } from '../../utils/auth'
import { success } from '../../utils/http/responses'
import { Validate } from '../../utils/validator/Validator'
import { classTopicService } from './ClassTopicService'
import rules from './validation/rules'

@JsonController('/class-topics/')
@Authorized()
export class ClassTopicController {
    @Get()
    public async list(@QueryParams() query): Promise<ApiResponse> {
        const topics = await classTopicService.list(query.page, query.per_page)

        return topics
    }

    @Post('from/classes')
    @Validate(rules.getFromClasses)
    public async getFromClasses(@Body() body): Promise<ApiResponse> {
        return success(await classTopicService.getFromClasses(body.classes))
    }

    @Get(':id')
    public async getOne(@Param('id') id: string): Promise<ApiResponse> {
        return success(await classTopicService.get(id))
    }

    @Post()
    @Validate(rules.onCreate)
    public async create(@Body() data: any): Promise<ApiResponse> {
        return success(await classTopicService.create({ ...data, class: data.classId }))
    }

    @Post(':id')
    @Validate(rules.onUpdate)
    public async update(@Body() data: any, @Param('id') id: string): Promise<ApiResponse> {
        return success(await classTopicService.update(id, data))
    }

    @Delete(':id')
    public async delete(@Param('id') id: string): Promise<ApiResponse> {
        return success(await classTopicService.delete(id))
    }

}