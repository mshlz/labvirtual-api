import { Body, Delete, Get, JsonController, Param, Post, QueryParams } from 'routing-controllers'
import { ApiResponse } from '../../interfaces/ApiResponse'
import { Validate, Yup } from '../../utils/validator/Validator'
import { SubjectService } from './SubjectService'
import rules from './validation/rules'

@JsonController('/subjects/')
export class SubjectController {
    @Get()
    public async list(@QueryParams() query): Promise<ApiResponse> {
        const subjects = await new SubjectService().list(query.page, query.per_page)

        return subjects
    }

    @Get(':id')
    public async getOne(@Param('id') id: string): Promise<ApiResponse> {
        const subject = await new SubjectService().get(id)

        return { data: subject }
    }

    @Post('get/discipline') // TODO invert this ? 
    @Validate({
        discipline: Yup.string().trim().uuid()
    })
    public async get(@Body() data: any): Promise<ApiResponse> {
        const result = await new SubjectService().getFromDiscipline(data.discipline)

        return { data: result }
    }

    @Post()
    @Validate(rules.onCreate)
    public async create(@Body() data: any): Promise<ApiResponse> {
        

        return { data: await new SubjectService().create(data) }
    }

    @Post(':id')
    @Validate(rules.onUpdate)
    public async update(@Body() data: any, @Param('id') id: string): Promise<ApiResponse> {
        

        return { data: await new SubjectService().update(id, data) }
    }

    @Delete(':id')
    public async delete(@Param('id') id: string): Promise<ApiResponse> {
        

        return { data: await new SubjectService().delete(id) }
    }
}