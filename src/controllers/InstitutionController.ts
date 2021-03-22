import { Body, Get, JsonController, Param, Post } from "routing-controllers";
import { ApiResponse } from "../interfaces/ApiResponse";
import { IUser } from "../models/User";
import { InstitutionService } from "../services/InstitutionService";
import { UserFromSession } from "../utils/decorators/UserFromSession";
import { Validate, Yup } from "../utils/validator/Validator";

@JsonController('/institutions/')
export class InstitutionController {
    @Get()
    public async list(): Promise<ApiResponse> {
        const institutions = await InstitutionService.list()

        return { data: institutions }
    }

    @Get(':id')
    public async getOne(@Param('id') id: string): Promise<ApiResponse> {
        const institution = await InstitutionService.get(id)

        return { data: institution }
    }

    @Post()
    @Validate({
        name: Yup.string().trim().min(3),
        acronym: Yup.string().trim().min(3)
    })
    public async create(@Body() data: any, @UserFromSession() user: IUser): Promise<ApiResponse> {
        if (user.type != 'admin') { } // TODO permission

        return { data: await InstitutionService.create(data) }
    }

    @Post(':id')
    @Validate({
        name: Yup.string().trim().min(3),
        acronym: Yup.string().trim().min(3)
    })
    public async update(@Body() data: any, @Param('id') id: string, @UserFromSession() user: IUser): Promise<ApiResponse> {
        if (user.type != 'admin') { } // TODO permission

        return { data: await InstitutionService.update(id, data) }
    }

}