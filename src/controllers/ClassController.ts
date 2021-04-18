import { Body, Delete, Get, JsonController, Param, Post } from "routing-controllers";
import { ApiResponse } from "../interfaces/ApiResponse";
import { IUser } from "../models/User";
import { ClassService } from "../services/ClassService";
import { UserFromSession } from "../utils/decorators/UserFromSession";
import { Validate, Yup } from "../utils/validator/Validator";

@JsonController('/classes/')
export class ClassController {
    @Get()
    public async list(): Promise<ApiResponse> {
        const classes = await ClassService.list()

        return { data: classes }
    }

    @Get(':id')
    public async getOne(@Param('id') id: string): Promise<ApiResponse> {
        const classe = await ClassService.get(id)

        return { data: classe }
    }

    @Post()
    @Validate({
        name: Yup.string().trim().min(3),
        discipline: Yup.string().trim().uuid()
    })
    public async create(@Body() data: any, @UserFromSession() user: IUser): Promise<ApiResponse> {
        if (user.type != 'admin') { } // TODO permission

        return { data: await ClassService.create(data) }
    }

    @Post(':id')
    @Validate({
        name: Yup.string().trim().min(3),
        discipline: Yup.string().trim().uuid()
    })
    public async update(@Body() data: any, @Param('id') id: string, @UserFromSession() user: IUser): Promise<ApiResponse> {
        if (user.type != 'admin') { } // TODO permission

        return { data: await ClassService.update(id, data) }
    }

    @Delete(':id')
    public async delete(@Param('id') id: string, @UserFromSession() user: IUser): Promise<ApiResponse> {
        if (user.type != 'admin') { } // TODO permission

        return { data: await ClassService.delete(id) }
    }

}