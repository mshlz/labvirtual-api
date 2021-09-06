import { Body, Delete, Get, JsonController, Param, Post, QueryParams } from 'routing-controllers'
import { ApiResponse } from '../../interfaces/ApiResponse'
import { Validate } from '../../utils/validator/Validator'
import { ClassTopicService } from './ClassTopicService'
import rules from './validation/rules'

@JsonController('/class-topics/')
export class ClassTopicController {
    @Get()
    public async list(@QueryParams() query): Promise<ApiResponse> {
        const topics = await new ClassTopicService().list(query.page, query.per_page)

        return topics
    }

    @Get('by-class/:id')
    public async getByClassId(@Param('id') id: string): Promise<ApiResponse> {
        const topic = await new ClassTopicService().getByClassId(id)

        return { data: topic }
    }

    @Get(':id')
    public async getOne(@Param('id') id: string): Promise<ApiResponse> {
        const topic = await new ClassTopicService().get(id)

        return { data: topic }
    }

    @Post()
    @Validate(rules.onCreate)
    public async create(@Body() data: any): Promise<ApiResponse> {

        return { data: await new ClassTopicService().create(data) }
    }

    @Post(':id')
    @Validate(rules.onUpdate)
    public async update(@Body() data: any, @Param('id') id: string): Promise<ApiResponse> {

        return { data: await new ClassTopicService().update(id, data) }
    }

    @Delete(':id')
    public async delete(@Param('id') id: string): Promise<ApiResponse> {

        return { data: await new ClassTopicService().delete(id) }
    }

}