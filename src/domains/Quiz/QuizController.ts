import { Body, Delete, Get, JsonController, Param, Post, QueryParams } from 'routing-controllers'
import { ApiResponse } from '../../interfaces/ApiResponse'
import { Authorized } from '../../utils/auth'
import { Validate } from '../../utils/validator/Validator'
import { quizService } from './QuizService'
import rules from './validation/rules'

@JsonController('/quiz/')
@Authorized()
export class QuizController {
    @Get()
    public async list(@QueryParams() query): Promise<ApiResponse> {
        const quizzes = await quizService.list(query.page, query.per_page)

        return quizzes
    }

    @Get(':id')
    public async getOne(@Param('id') id: string): Promise<ApiResponse> {
        const quiz = await quizService.get(id)

        return { data: quiz }
    }

    @Post()
    @Validate(rules.onCreate)
    public async create(@Body() data: any): Promise<ApiResponse> {


        return { data: await quizService.create({ ...data, questions: data.ref_questions || [] }) }
    }

    @Post(':id')
    @Validate(rules.onUpdate)
    public async update(@Body() data: any, @Param('id') id: string): Promise<ApiResponse> {


        return { data: await quizService.update(id, data) }
    }

    @Delete(':id')
    public async delete(@Param('id') id: string): Promise<ApiResponse> {


        return { data: await quizService.delete(id) }
    }

}