import { Body, Delete, Get, JsonController, Param, Post, QueryParams } from 'routing-controllers'
import { ApiResponse } from '../../interfaces/ApiResponse'
import { success } from '../../utils/http/responses'
import { Validate } from '../../utils/validator/Validator'
import { pageSectionService } from './PageSectionService'
import rules from './validation/rules'

@JsonController('/page-sections/')
export class PageSectionController {
    @Get()
    public async list(@QueryParams() query): Promise<ApiResponse> {
        const sections = await pageSectionService.list(query.page, query.per_page)
        return sections
    }

    @Get('slug/:slug')
    public async getByCode(@Param('slug') slug: string): Promise<ApiResponse> {
        return success(await pageSectionService.getBySlug(slug))
    }

    @Get(':id')
    public async getOne(@Param('id') id: string): Promise<ApiResponse> {
        return success(await pageSectionService.get(id))
    }

    @Post()
    @Validate(rules.onCreate)
    public async create(@Body() data: any): Promise<ApiResponse> {
        return success(await pageSectionService.create(data))
    }

    @Post(':id')
    @Validate(rules.onUpdate)
    public async update(@Body() data: any, @Param('id') id: string): Promise<ApiResponse> {
        return success(await pageSectionService.update(id, data))
    }

    @Delete(':id')
    public async delete(@Param('id') id: string): Promise<ApiResponse> {
        return success(await pageSectionService.delete(id))
    }

}