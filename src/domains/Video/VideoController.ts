import { Body, Delete, Get, JsonController, Param, Post, QueryParams } from 'routing-controllers'
import { ApiResponse } from '../../interfaces/ApiResponse'
import { success } from '../../utils/http/responses'
import { Validate } from '../../utils/validator/Validator'
import { videosService } from './VideoService'
import rules from './validation/rules'
import { Authorized, Role } from '../../utils/auth'

@JsonController('/videos/')
export class VideoController {
    @Get()
    public async list(@QueryParams() query): Promise<ApiResponse> {
        const videos = await videosService.list(query.page, query.per_page)

        return videos
    }

    @Get('code/:code')
    public async getByCode(@Param('code') code: string): Promise<ApiResponse> {
        return success(await videosService.getByCode(code))
    }

    @Get(':id')
    public async getOne(@Param('id') id: string): Promise<ApiResponse> {
        return success(await videosService.get(id))
    }

    @Post()
    @Validate(rules.onCreate)
    @Authorized(Role.MODERATOR)
    public async create(@Body() data: any): Promise<ApiResponse> {
        return success(await videosService.create(data))
    }

    @Post('from/disciplines')
    @Validate(rules.getFromDisciplines)
    public async getFromDisciplines(@Body() data: any): Promise<ApiResponse> {
        return success(await videosService.getFromDisciplines(data.disciplines))
    }

    @Post('from/subjects')
    @Validate(rules.getFromSubjects)
    public async getFromSubjects(@Body() data: any): Promise<ApiResponse> {
        return success(await videosService.getFromSubjects(data.subjects))
    }

    @Post(':id')
    @Validate(rules.onUpdate)
    @Authorized(Role.MODERATOR)
    public async update(@Body() data: any, @Param('id') id: string): Promise<ApiResponse> {
        return success(await videosService.update(id, data))
    }

    @Delete(':id')
    @Authorized(Role.MODERATOR)
    public async delete(@Param('id') id: string): Promise<ApiResponse> {
        return success(await videosService.delete(id))
    }

}