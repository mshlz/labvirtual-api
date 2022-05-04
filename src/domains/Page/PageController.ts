import { Body, Delete, Get, JsonController, Param, Post, QueryParams } from 'routing-controllers'
import { ApiResponse } from '../../interfaces/ApiResponse'
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
    public async create(@Body() data: any): Promise<ApiResponse> {
        return success(await pageService.create(data))
    }

    @Post('from/sections')
    @Validate(rules.getFromSections)
    public async getFromDisciplines(@Body() data: any): Promise<ApiResponse> {
        return success(await pageService.getFromSections(data.sections))
    }

    @Post(':id')
    @Validate(rules.onUpdate)
    public async update(@Body() data: any, @Param('id') id: string): Promise<ApiResponse> {
        return success(await pageService.update(id, data))
    }

    @Delete(':id')
    public async delete(@Param('id') id: string): Promise<ApiResponse> {
        return success(await pageService.delete(id))
    }

}