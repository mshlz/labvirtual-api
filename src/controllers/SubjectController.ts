import { Body, Delete, Get, JsonController, Param, Post } from "routing-controllers";
import { ApiResponse } from "../interfaces/ApiResponse";
import { IUser } from "../models/User";
import { SubjectService } from "../services/SubjectService";
import { UserFromSession } from "../utils/decorators/UserFromSession";
import { Validate, Yup } from "../utils/validator/Validator";

@JsonController('/subjects/')
export class ClassController {
    @Get()
    public async list(): Promise<ApiResponse> {
        const subjects = await SubjectService.list()

        return { data: subjects }
    }

    @Get(':id')
    public async getOne(@Param('id') id: string): Promise<ApiResponse> {
        const subject = await SubjectService.get(id)

        return { data: subject }
    }

    @Post('get/discipline')
    @Validate({
        discipline: Yup.string().trim().uuid()
    })
    public async get(@Body() data: any, @UserFromSession() user: IUser): Promise<ApiResponse> {
        const result = await SubjectService.getFromDiscipline(data.discipline)

        return { data: result }
    }

    @Post()
    @Validate({
        name: Yup.string().trim().min(3),
        discipline: Yup.string().trim().uuid()
    })
    public async create(@Body() data: any, @UserFromSession() user: IUser): Promise<ApiResponse> {
        if (user.type != 'admin') { } // TODO permission

        return { data: await SubjectService.create(data) }
    }

    @Post(':id')
    @Validate({
        name: Yup.string().trim().min(3),
        discipline: Yup.string().trim().uuid()
    })
    public async update(@Body() data: any, @Param('id') id: string, @UserFromSession() user: IUser): Promise<ApiResponse> {
        if (user.type != 'admin') { } // TODO permission

        return { data: await SubjectService.update(id, data) }
    }

    @Delete(':id')
    public async delete(@Param('id') id: string, @UserFromSession() user: IUser): Promise<ApiResponse> {
        if (user.type != 'admin') { } // TODO permission

        return { data: await SubjectService.delete(id) }
    }
}