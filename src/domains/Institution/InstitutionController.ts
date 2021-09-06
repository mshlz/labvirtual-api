import { Body, Delete, Get, JsonController, Param, Post, QueryParams } from "routing-controllers";
import { ApiResponse } from "../../interfaces/ApiResponse";
import { IUser } from "../System/User/User";
import { InstitutionService } from "./InstitutionService";
import { UserFromSession } from "../../utils/decorators/UserFromSession";
import { Validate, Yup } from "../../utils/validator/Validator";

@JsonController('/institutions/')
export class InstitutionController {
    @Get()
    public async list(@QueryParams() query): Promise<ApiResponse> {
        console.log(query)
        const institutions = await new InstitutionService().list(query.page, query.per_page)

        return institutions
    }

    @Get(':id')
    public async getOne(@Param('id') id: string): Promise<ApiResponse> {
        const institution = await new InstitutionService().get(id)

        return { data: institution }
    }

    @Post()
    @Validate({
        name: Yup.string().trim().min(3),
        acronym: Yup.string().trim().min(3)
    })
    public async create(@Body() data: any, @UserFromSession() user: IUser): Promise<ApiResponse> {
        if (user.type != 'admin') { } // TODO permission

        return { data: await new InstitutionService().create(data) }
    }

    @Post(':id')
    @Validate({
        name: Yup.string().trim().min(3),
        acronym: Yup.string().trim().min(3)
    })
    public async update(@Body() data: any, @Param('id') id: string, @UserFromSession() user: IUser): Promise<ApiResponse> {
        if (user.type != 'admin') { } // TODO permission

        return { data: await new InstitutionService().update(id, data) }
    }

    @Delete(':id')
    public async delete(@Param('id') id: string, @UserFromSession() user: IUser): Promise<ApiResponse> {
        if (user.type != 'admin') { } // TODO permission

        return { data: await new InstitutionService().delete(id) }
    }

}