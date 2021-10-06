import { Body, Delete, Get, JsonController, Param, Post, QueryParams } from 'routing-controllers'
import { ApiResponse } from '../../interfaces/ApiResponse'
import { Validate } from '../../utils/validator/Validator'
import { classService } from './ClassService'
import rules from './validation/rules'

@JsonController('/classes/')
export class ClassController {
    @Get()
    public async list(@QueryParams() query): Promise<ApiResponse> {
        const classes = await classService.list(query.page, query.per_page)

        return classes
    }

    @Get(':id')
    public async getOne(@Param('id') id: string): Promise<ApiResponse> {
        const classe = await classService.get(id)

        return { data: classe }
    }

    @Get(':id/people')
    public async getPeople(@Param('id') id: string): Promise<ApiResponse> {
        const classe = await classService.getPeopleFromClass(id)

        return { data: classe }
    }

    @Post()
    @Validate(rules.onCreate)
    public async create(@Body() data: any): Promise<ApiResponse> {

        return { data: await classService.create(data) }
    }

    @Post(':id')
    @Validate(rules.onUpdate)
    public async update(@Body() data: any, @Param('id') id: string): Promise<ApiResponse> {

        return { data: await classService.update(id, data) }
    }

    @Delete(':id')
    public async delete(@Param('id') id: string): Promise<ApiResponse> {

        return { data: await classService.delete(id) }
    }

}