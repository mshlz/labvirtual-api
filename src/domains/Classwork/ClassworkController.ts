import { Body, Delete, Get, JsonController, Param, Post, QueryParams } from 'routing-controllers'
import { ApiResponse } from '../../interfaces/ApiResponse'
import { fromRule } from '../../utils/helpers'
import { success } from '../../utils/http/responses'
import { Validate } from '../../utils/validator/Validator'
import { classworkQuestionService } from '../ClassworkQuestion/ClassworkQuestionService'
import { classworkService } from './ClassworkService'
import rules from './validation/rules'

@JsonController('/classworks/')
export class ClassworkController {
    @Get()
    public async list(@QueryParams() query): Promise<ApiResponse> {
        const result = await classworkService.list(query.page, query.per_page)
        return result
    }

    @Get(':id')
    public async getOne(@Param('id') id: string): Promise<ApiResponse> {
        return success(await classworkService.get(id))
    }

    @Post()
    @Validate(rules.onCreate)
    public async create(@Body() data: any): Promise<ApiResponse> {
        return success(await classworkService.create(data))
    }

    @Post(':id')
    @Validate(rules.onUpdate)
    public async update(@Body() data: any, @Param('id') id: string): Promise<ApiResponse> {
        return success(await classworkService.update(id, data))
    }

    @Delete(':id')
    public async delete(@Param('id') id: string): Promise<ApiResponse> {
        return success(await classworkService.delete(id))
    }

}