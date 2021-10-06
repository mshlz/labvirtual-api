import { Body, Delete, Get, JsonController, Param, Post, QueryParams } from 'routing-controllers'
import { ApiResponse } from '../../interfaces/ApiResponse'
import { Validate } from '../../utils/validator/Validator'
import { classTopicService } from './ClassTopicService'
import rules from './validation/rules'

@JsonController('/class-topics/')
export class ClassTopicController {
    @Get()
    public async list(@QueryParams() query): Promise<ApiResponse> {
        const topics = await classTopicService.list(query.page, query.per_page)

        return topics
    }

    @Get('by-class/:id')
    public async getByClassId(@Param('id') id: string): Promise<ApiResponse> {
        const topic = await classTopicService.getByClassId(id)

        return { data: topic }
    }

    @Get(':id')
    public async getOne(@Param('id') id: string): Promise<ApiResponse> {
        const topic = await classTopicService.get(id)

        return { data: topic }
    }

    @Post()
    @Validate(rules.onCreate)
    public async create(@Body() data: any): Promise<ApiResponse> {

        return { data: await classTopicService.create(data) }
    }

    @Post(':id')
    @Validate(rules.onUpdate)
    public async update(@Body() data: any, @Param('id') id: string): Promise<ApiResponse> {

        return { data: await classTopicService.update(id, data) }
    }

    @Delete(':id')
    public async delete(@Param('id') id: string): Promise<ApiResponse> {

        return { data: await classTopicService.delete(id) }
    }

}