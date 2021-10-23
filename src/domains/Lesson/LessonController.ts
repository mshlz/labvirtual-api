import { Body, Delete, Get, JsonController, Param, Post, QueryParams } from 'routing-controllers'
import { ApiResponse } from '../../interfaces/ApiResponse'
import { success } from '../../utils/http/responses'
import { Validate } from '../../utils/validator/Validator'
import { lessonService } from './LessonService'
import rules from './validation/rules'

@JsonController('/lessons/')
export class LessonController {
    @Get()
    public async list(@QueryParams() query): Promise<ApiResponse> {
        const lessons = await lessonService.list(query.page, query.per_page)

        return lessons
    }

    @Get('code/:code')
    public async getByCode(@Param('code') code: string): Promise<ApiResponse> {
        return success(await lessonService.getByCode(code))
    }

    @Get(':id')
    public async getOne(@Param('id') id: string): Promise<ApiResponse> {
        return success(await lessonService.get(id))
    }

    @Post()
    @Validate(rules.onCreate)
    public async create(@Body() data: any): Promise<ApiResponse> {
        return success(await lessonService.create(data))
    }

    @Post('from/disciplines')
    @Validate(rules.getFromDisciplines)
    public async getFromDisciplines(@Body() data: any): Promise<ApiResponse> {
        return success(await lessonService.getFromDisciplines(data.disciplines))
    }

    @Post('from/subjects')
    @Validate(rules.getFromSubjects)
    public async getFromSubjects(@Body() data: any): Promise<ApiResponse> {
        return success(await lessonService.getFromSubjects(data.subjects))
    }

    @Post(':id')
    @Validate(rules.onUpdate)
    public async update(@Body() data: any, @Param('id') id: string): Promise<ApiResponse> {
        return success(await lessonService.update(id, data))
    }

    @Delete(':id')
    public async delete(@Param('id') id: string): Promise<ApiResponse> {
        return success(await lessonService.delete(id))
    }

}