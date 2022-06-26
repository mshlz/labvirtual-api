import { Body, Delete, Get, JsonController, Param, Post, QueryParams } from 'routing-controllers'
import { ApiResponse } from '../../interfaces/ApiResponse'
import { Authorized } from '../../utils/auth'
import { success } from '../../utils/http/responses'
import { Validate } from '../../utils/validator/Validator'
import { glossaryService } from './GlossaryService'
import rules from './validation/rules'

@JsonController('/glossary/')
@Authorized()
export class GlossaryController {
    @Get()
    public async list(@QueryParams() query): Promise<ApiResponse> {
        const entries = await glossaryService.list(query.page, query.per_page)

        return entries
    }

    @Get('search')
    public async simpleSearch(@QueryParams() params): Promise<ApiResponse> {
        return success(await glossaryService.simpleSearch(params.query, params.page, params.limit))
    }

    @Get(':id')
    public async getOne(@Param('id') id: string): Promise<ApiResponse> {
        return success(await glossaryService.get(id))
    }

    @Post('from/disciplines')
    @Validate(rules.getFromDisciplines)
    public async get(@Body() data: any): Promise<ApiResponse> {
        return success(await glossaryService.getFromDiscipline(data.disciplines))
    }

    @Post()
    @Validate(rules.onCreate)
    public async create(@Body() data: any): Promise<ApiResponse> {
        return success(await glossaryService.create(data))
    }

    @Post(':id')
    @Validate(rules.onUpdate)
    public async update(@Body() data: any, @Param('id') id: string): Promise<ApiResponse> {
        return success(await glossaryService.update(id, data))
    }

    @Delete(':id')
    public async delete(@Param('id') id: string): Promise<ApiResponse> {
        return success(await glossaryService.delete(id))
    }

}