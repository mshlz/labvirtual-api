import { Body, Delete, Get, JsonController, Param, Post, QueryParams } from 'routing-controllers'
import { ApiResponse } from '../../interfaces/ApiResponse'
import { Validate } from '../../utils/validator/Validator'
import { ClassEnrollmentService } from './ClassEnrollmentService'
import rules from './validation/rules'

@JsonController('/class-enrollments/')
export class ClassEnrollmentController {
    @Get()
    public async list(@QueryParams() query): Promise<ApiResponse> {
        const topics = await new ClassEnrollmentService().list(query.page, query.per_page)

        return topics
    }
    
    @Get(':id')
    public async getOne(@Param('id') id: string): Promise<ApiResponse> {
        const topic = await new ClassEnrollmentService().get(id)

        return { data: topic }
    }

    @Post()
    @Validate(rules.onCreate)
    public async create(@Body() data: any): Promise<ApiResponse> {

        return { data: await new ClassEnrollmentService().create(data) }
    }

    @Post(':id')
    @Validate(rules.onUpdate)
    public async update(@Body() data: any, @Param('id') id: string): Promise<ApiResponse> {

        return { data: await new ClassEnrollmentService().update(id, data) }
    }

    @Delete(':id')
    public async delete(@Param('id') id: string): Promise<ApiResponse> {

        return { data: await new ClassEnrollmentService().delete(id) }
    }

}