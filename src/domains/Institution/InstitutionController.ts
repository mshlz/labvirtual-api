import { Body, Delete, Get, JsonController, Param, Post, QueryParams } from 'routing-controllers'
import { ApiResponse } from '../../interfaces/ApiResponse'
import { Validate } from '../../utils/validator/Validator'
import { InstitutionService } from './InstitutionService'
import rules from './validation/rules'

@JsonController('/institutions/')
export class InstitutionController {
    @Get()
    public async list(@QueryParams() query): Promise<ApiResponse> {
        const institutions = await new InstitutionService().list(query.page, query.per_page)

        return institutions
    }

    @Get(':id')
    public async getOne(@Param('id') id: string): Promise<ApiResponse> {
        const institution = await new InstitutionService().get(id)

        return { data: institution }
    }

    @Post()
    @Validate(rules.onCreate)
    public async create(@Body() data: any): Promise<ApiResponse> {
        

        return { data: await new InstitutionService().create(data) }
    }

    @Post(':id')
    @Validate(rules.onUpdate)
    public async update(@Body() data: any, @Param('id') id: string): Promise<ApiResponse> {
        

        return { data: await new InstitutionService().update(id, data) }
    }

    @Delete(':id')
    public async delete(@Param('id') id: string): Promise<ApiResponse> {
        

        return { data: await new InstitutionService().delete(id) }
    }

}