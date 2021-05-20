import { Body, Delete, Get, JsonController, Param, Post } from "routing-controllers";
import { ApiResponse } from "../interfaces/ApiResponse";
import { IUser } from "../models/User";
import { GlossaryService } from "../services/GlossaryService";
import { UserFromSession } from "../utils/decorators/UserFromSession";
import { Validate, Yup } from "../utils/validator/Validator";

@JsonController('/glossary/')
export class GlossaryController {
    @Get()
    public async list(): Promise<ApiResponse> {
        const entries = await GlossaryService.list()

        return { data: entries }
    }

    @Get(':id')
    public async getOne(@Param('id') id: string): Promise<ApiResponse> {
        const entry = await GlossaryService.get(id)

        return { data: entry }
    }

    // @Post('get/discipline')
    // @Validate({
    //     discipline: Yup.string().trim().uuid()
    // })
    // public async get(@Body() data: any, @UserFromSession() user: IUser): Promise<ApiResponse> {
    //     const result = await GlossaryService.getFromDiscipline(data.discipline)

    //     return { data: result }
    // }

    @Post()
    @Validate({
        name: Yup.string().trim().min(1),
        description: Yup.string().trim().min(3),
        discipline: Yup.string().trim().uuid(),
        // subject: Yup.string().notRequired().trim().uuid(),
    })
    public async create(@Body() data: any, @UserFromSession() user: IUser): Promise<ApiResponse> {
        if (user.type != 'admin') { } // TODO permission

        return { data: await GlossaryService.create(data) }
    }

    @Post(':id')
    @Validate({
        name: Yup.string().trim().min(1),
        description: Yup.string().trim().min(3),
        discipline: Yup.string().trim().uuid(),
        // subject: Yup.string().trim().uuid(),
    })
    public async update(@Body() data: any, @Param('id') id: string, @UserFromSession() user: IUser): Promise<ApiResponse> {
        if (user.type != 'admin') { } // TODO permission

        return { data: await GlossaryService.update(id, data) }
    }

    @Delete(':id')
    public async delete(@Param('id') id: string, @UserFromSession() user: IUser): Promise<ApiResponse> {
        if (user.type != 'admin') { } // TODO permission

        return { data: await GlossaryService.delete(id) }
    }

}