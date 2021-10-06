import { Body, Delete, Get, JsonController, Param, Post, QueryParams } from 'routing-controllers'
import { ApiResponse } from '../../interfaces/ApiResponse'
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

    @Get(':id')
    public async getOne(@Param('id') id: string): Promise<ApiResponse> {
        const subject = await lessonService.get(id)

        return { data: subject }
    }

    // @Post('get/discipline')
    // @Validate({
    //     discipline: Yup.string().trim().uuid()
    // })
    // public async get(@Body() data: any, @UserFromSession() user: IUser): Promise<ApiResponse> {
    //     const result = await LessonService.getFromDiscipline(data.discipline)

    //     return { data: result }
    // }

    @Post()
    @Validate(rules.onCreate)
    public async create(@Body() data: any): Promise<ApiResponse> {
        

        return { data: await lessonService.create(data) }
    }

    @Post(':id')
    @Validate(rules.onUpdate)
    public async update(@Body() data: any, @Param('id') id: string): Promise<ApiResponse> {
        

        return { data: await lessonService.update(id, data) }
    }

    @Delete(':id')
    public async delete(@Param('id') id: string): Promise<ApiResponse> {
        

        return { data: await lessonService.delete(id) }
    }

}