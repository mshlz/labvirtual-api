import { Body, Delete, Get, JsonController, Param, Post, QueryParams } from 'routing-controllers'
import { ApiResponse } from '../../interfaces/ApiResponse'
import { success } from '../../utils/http/responses'
import { Validate } from '../../utils/validator/Validator'
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
        return success(await subjectService.get(id))
    }

    @Post('from/disciplines')
    @Validate(rules.getFromDisciplines)
    public async getFromDisciplines(@Body() data: any): Promise<ApiResponse> {
        return success(await subjectService.getFromDisciplines(data.disciplines))
    }

    @Post()
    @Validate(rules.onCreate)
    public async create(@Body() data: any): Promise<ApiResponse> {
        return success(await subjectService.create(data))
    }

    @Post(':id')
    @Validate(rules.onUpdate)
    public async update(@Body() data: any, @Param('id') id: string): Promise<ApiResponse> {
        return success(await subjectService.update(id, data))
    }

    @Delete(':id')
    public async delete(@Param('id') id: string): Promise<ApiResponse> {
        return success(await subjectService.delete(id))
    }
}