import { Body, Delete, Get, JsonController, Param, Post, QueryParams } from 'routing-controllers'
import { ApiResponse } from '../../interfaces/ApiResponse'
import { Validate } from '../../utils/validator/Validator'
import { GlossaryService } from './GlossaryService'
import rules from './validation/rules'

@JsonController('/glossary/')
export class GlossaryController {
    @Get()
    public async list(@QueryParams() query): Promise<ApiResponse> {
        const entries = await new GlossaryService().list(query.page, query.per_page)

        return entries
    }

    @Get('search')
    public async simpleSearch(@QueryParams() params): Promise<ApiResponse> {
        const entries = await new GlossaryService().simpleSearch(params.query, params.page, params.limit)

        return { data: entries }
    }

    @Get(':id')
    public async getOne(@Param('id') id: string): Promise<ApiResponse> {
        const entry = await new GlossaryService().get(id)

        return { data: entry }
    }

    // @Post('get/discipline')
    // @Validate({
    //     discipline: Yup.string().trim().uuid()
    // })
    // public async get(@Body() data: any, @UserFromSession() user: IUser): Promise<ApiResponse> {
    //     const result = await GlossaryService.getFromDiscipline(data.discipline)

    //     return { data: result }
    // }

    @Post()
    @Validate(rules.onCreate)
    public async create(@Body() data: any): Promise<ApiResponse> {
        

        return { data: await new GlossaryService().create(data) }
    }

    @Post(':id')
    @Validate(rules.onUpdate)
    public async update(@Body() data: any, @Param('id') id: string): Promise<ApiResponse> {
        

        return { data: await new GlossaryService().update(id, data) }
    }

    @Delete(':id')
    public async delete(@Param('id') id: string): Promise<ApiResponse> {
        

        return { data: await new GlossaryService().delete(id) }
    }

}