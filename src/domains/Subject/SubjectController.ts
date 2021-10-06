import { Body, Delete, Get, JsonController, Param, Post, QueryParams } from 'routing-controllers'
import { ApiResponse } from '../../interfaces/ApiResponse'
import { Validate, Yup } from '../../utils/validator/Validator'
import { subjectService } from './SubjectService'
import rules from './validation/rules'

@JsonController('/subjects/')
export class SubjectController {
    @Get()
    public async list(@QueryParams() query): Promise<ApiResponse> {
        const subjects = await subjectService.list(query.page, query.per_page)

        return subjects
    }

    @Get(':id')
    public async getOne(@Param('id') id: string): Promise<ApiResponse> {
        const subject = await subjectService.get(id)

        return { data: subject }
    }

    @Post('get/disciplines') // TODO invert this ? 
    @Validate({
        disciplines: Yup.array().of(Yup.string().uuid())
    })
    public async get(@Body() data: any): Promise<ApiResponse> {
        console.log(subjectService)
        const result = await subjectService.getFromDisciplines(data.disciplines)

        return { data: result }
    }

    @Post()
    @Validate(rules.onCreate)
    public async create(@Body() data: any): Promise<ApiResponse> {
        

        return { data: await subjectService.create(data) }
    }

    @Post(':id')
    @Validate(rules.onUpdate)
    public async update(@Body() data: any, @Param('id') id: string): Promise<ApiResponse> {
        

        return { data: await subjectService.update(id, data) }
    }

    @Delete(':id')
    public async delete(@Param('id') id: string): Promise<ApiResponse> {
        

        return { data: await subjectService.delete(id) }
    }
}