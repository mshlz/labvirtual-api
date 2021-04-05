import { Body, Get, JsonController, Param, Post } from "routing-controllers";
import { ApiResponse } from "../interfaces/ApiResponse";
import { IUser } from "../models/User";
import { LessonService } from "../services/LessonService";
import { UserFromSession } from "../utils/decorators/UserFromSession";
import { Validate, Yup } from "../utils/validator/Validator";

@JsonController('/lessons/')
export class LessonController {
    @Get()
    public async list(): Promise<ApiResponse> {
        const lessons = await LessonService.list()

        return { data: lessons }
    }

    @Get(':id')
    public async getOne(@Param('id') id: string): Promise<ApiResponse> {
        const subject = await LessonService.get(id)

        return { data: subject }
    }

    // @Post('get/discipline')
    // @Validate({
    //     discipline: Yup.string().trim().uuid()
    // })
    // public async get(@Body() data: any, @UserFromSession() user: IUser): Promise<ApiResponse> {
    //     const result = await LessonService.getFromDiscipline(data.discipline)

    //     return { data: result }
    // }

    @Post()
    @Validate({
        name: Yup.string().trim().min(3),
        discipline: Yup.string().trim().uuid()
    })
    public async create(@Body() data: any, @UserFromSession() user: IUser): Promise<ApiResponse> {
        if (user.type != 'admin') { } // TODO permission

        return { data: await LessonService.create(data) }
    }

    @Post(':id')
    @Validate({
        name: Yup.string().trim().min(3),
        discipline: Yup.string().trim().uuid()
    })
    public async update(@Body() data: any, @Param('id') id: string, @UserFromSession() user: IUser): Promise<ApiResponse> {
        if (user.type != 'admin') { } // TODO permission

        return { data: await LessonService.update(id, data) }
    }
}