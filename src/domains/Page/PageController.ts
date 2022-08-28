import { Body, Delete, Get, JsonController, Param, Post, QueryParams } from 'routing-controllers'
import { ApiResponse } from '../../interfaces/ApiResponse'
import { Authorized, Role } from '../../utils/auth'
import { success } from '../../utils/http/responses'
import { Validate } from '../../utils/validator/Validator'
import { pageService } from './PageService'
import rules from './validation/rules'

@JsonController('/pages/')
export class PageController {
    @Get()
    public async list(@QueryParams() query): Promise<ApiResponse> {
        const pages = await pageService.list(query.page, query.per_page)

        return pages
    }

    @Get('code/:code')
    public async getByCode(@Param('code') code: string): Promise<ApiResponse> {
        return success(await pageService.getByCode(code))
    }

    @Get(':id')
    public async getOne(@Param('id') id: string): Promise<ApiResponse> {
        return success(await pageService.get(id))
    }

    @Post()
    @Validate(rules.onCreate)
    @Authorized(Role.MODERATOR)
    public async create(@Body() data: any): Promise<ApiResponse> {
        return success(await pageService.create(data))
    }

    @Post('from/disciplines')
    @Validate(rules.getFromDisciplines)
    public async getFromDisciplines(@Body() data: any): Promise<ApiResponse> {
        return success(await pageService.getFromDisciplines(data.disciplines))
    }

    @Post('from/subjects')
    @Validate(rules.getFromSubjects)
    public async getFromSubjects(@Body() data: any): Promise<ApiResponse> {
        return success(await pageService.getFromSubjects(data.subjects))
    }

    @Post(':id')
    @Validate(rules.onUpdate)
    @Authorized(Role.MODERATOR)
    public async update(@Body() data: any, @Param('id') id: string): Promise<ApiResponse> {
        return success(await pageService.update(id, data))
    }

    @Delete(':id')
    @Authorized(Role.MODERATOR)
    public async delete(@Param('id') id: string): Promise<ApiResponse> {
        return success(await pageService.delete(id))
    }

}