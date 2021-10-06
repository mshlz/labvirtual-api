import { Body, Delete, Get, JsonController, Param, Post, QueryParams } from 'routing-controllers'
import { ApiResponse } from '../../interfaces/ApiResponse'
import { Validate } from '../../utils/validator/Validator'
import { disciplineService } from './DisciplineService'
import rules from './validation/rules'

@JsonController('/disciplines/')
export class UserController {
    @Get()
    public async list(@QueryParams() query): Promise<ApiResponse> {
        const disciplines = await disciplineService.list(query.page, query.per_page)

        return disciplines
    }

    @Get(':id')
    public async getOne(@Param('id') id: string): Promise<ApiResponse> {
        const discipline = await disciplineService.get(id)

        return { data: discipline }
    }

    @Post()
    @Validate(rules.onCreate)
    public async create(@Body() data: any): Promise<ApiResponse> {
        

        return { data: await disciplineService.create(data) }
    }

    @Post(':id')
    @Validate(rules.onUpdate)
    public async update(@Body() data: any, @Param('id') id: string): Promise<ApiResponse> {
        

        return { data: await disciplineService.update(id, data) }
    }

    @Delete(':id')
    public async delete(@Param('id') id: string): Promise<ApiResponse> {
        

        return { data: await disciplineService.delete(id) }
    }

}