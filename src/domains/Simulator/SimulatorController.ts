import { Body, Delete, Get, JsonController, Param, Post, QueryParams } from 'routing-controllers'
import { ApiResponse } from '../../interfaces/ApiResponse'
import { Authorized, Role } from '../../utils/auth'
import { success } from '../../utils/http/responses'
import { Validate } from '../../utils/validator/Validator'
import { simultatorService } from './SimulatorService'
import rules from './validation/rules'

@JsonController('/simulators/')
export class SimulatorController {
    @Get()
    public async list(@QueryParams() query): Promise<ApiResponse> {
        const simulators = await simultatorService.list(query.page, query.per_page)

        return simulators
    }

    @Get('code/:code')
    public async getByCode(@Param('code') code: string): Promise<ApiResponse> {
        return success(await simultatorService.getByCode(code))
    }

    @Get(':id')
    public async getOne(@Param('id') id: string): Promise<ApiResponse> {
        return success(await simultatorService.get(id))
    }

    @Post()
    @Validate(rules.onCreate)
    @Authorized(Role.MODERATOR)
    public async create(@Body() data: any): Promise<ApiResponse> {
        return success(await simultatorService.create(data))
    }

    @Post('from/disciplines')
    @Validate(rules.getFromDisciplines)
    public async getFromDisciplines(@Body() data: any): Promise<ApiResponse> {
        return success(await simultatorService.getFromDisciplines(data.disciplines))
    }

    @Post('from/subjects')
    @Validate(rules.getFromSubjects)
    public async getFromSubjects(@Body() data: any): Promise<ApiResponse> {
        return success(await simultatorService.getFromSubjects(data.subjects))
    }

    @Post(':id')
    @Validate(rules.onUpdate)
    @Authorized(Role.MODERATOR)
    public async update(@Body() data: any, @Param('id') id: string): Promise<ApiResponse> {
        return success(await simultatorService.update(id, data))
    }

    @Delete(':id')
    @Authorized(Role.MODERATOR)
    public async delete(@Param('id') id: string): Promise<ApiResponse> {
        return success(await simultatorService.delete(id))
    }

}