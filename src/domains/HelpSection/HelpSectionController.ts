import { Body, Delete, Get, JsonController, Param, Post, QueryParams } from 'routing-controllers'
import { ApiResponse } from '../../interfaces/ApiResponse'
import { Authorized, Role } from '../../utils/auth'
import { success } from '../../utils/http/responses'
import { Validate } from '../../utils/validator/Validator'
import { helpSectionService } from './HelpSectionService'
import rules from './validation/rules'

@JsonController('/help-sections/')
export class HelpSectionController {
    @Get()
    public async list(@QueryParams() query): Promise<ApiResponse> {
        const sections = await helpSectionService.list(query.page, query.per_page)
        return sections
    }

    @Get('slug/:slug')
    public async getBySlug(@Param('slug') slug: string): Promise<ApiResponse> {
        return success(await helpSectionService.getBySlug(slug))
    }

    @Get(':id')
    public async getOne(@Param('id') id: string): Promise<ApiResponse> {
        return success(await helpSectionService.get(id))
    }

    @Post()
    @Validate(rules.onCreate)
    @Authorized(Role.MODERATOR)
    public async create(@Body() data: any): Promise<ApiResponse> {
        return success(await helpSectionService.create(data))
    }

    @Post(':id')
    @Authorized(Role.MODERATOR)
    @Validate(rules.onUpdate)
    public async update(@Body() data: any, @Param('id') id: string): Promise<ApiResponse> {
        return success(await helpSectionService.update(id, data))
    }

    @Delete(':id')
    @Authorized(Role.MODERATOR)
    public async delete(@Param('id') id: string): Promise<ApiResponse> {
        return success(await helpSectionService.delete(id))
    }

}