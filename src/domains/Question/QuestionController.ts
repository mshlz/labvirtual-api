import { Body, Delete, Get, JsonController, Param, Post, QueryParams } from 'routing-controllers'
import { ApiResponse } from '../../interfaces/ApiResponse'
import { success } from '../../utils/http/responses'
import { Validate } from '../../utils/validator/Validator'
import { questionService } from './QuestionService'
import rules from './validation/rules'

@JsonController('/questions/')
export class QuestionController {
    @Get()
    public async list(@QueryParams() query): Promise<ApiResponse> {
        const quesitons = await questionService.list(query.page, query.per_page)

        return quesitons
    }

    @Post('simple-search')
    @Validate(rules.simpleSearch)
    public async simpleSearch(@Body() data): Promise<ApiResponse> {
        return success(await questionService.simpleSearch(data.query))
    }

    @Get(':id')
    public async getOne(@Param('id') id: string): Promise<ApiResponse> {
        return success(await questionService.get(id))
    }

    @Post()
    @Validate(rules.onCreate)
    public async create(@Body() data: any): Promise<ApiResponse> {
        questionService.validateAlternatives(data)

        return success(await questionService.create(data))
    }

    @Post(':id')
    @Validate(rules.onUpdate)
    public async update(@Body() data: any, @Param('id') id: string): Promise<ApiResponse> {
        questionService.validateAlternatives(data)

        return success(await questionService.update(id, data))
    }

    @Delete(':id')
    public async delete(@Param('id') id: string): Promise<ApiResponse> {
        return success(await questionService.delete(id))
    }

}