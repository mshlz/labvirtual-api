import { Body, Delete, Get, JsonController, Param, Post, QueryParams } from "routing-controllers";
import { ApiResponse } from "../../interfaces/ApiResponse";
import { IUser } from "../System/User/User";
import { DisciplineService } from "./DisciplineService";
import { UserFromSession } from "../../utils/decorators/UserFromSession";
import { Validate, Yup } from "../../utils/validator/Validator";

@JsonController('/disciplines/')
export class UserController {
    @Get()
    public async list(@QueryParams() query): Promise<ApiResponse> {
        const disciplines = await new DisciplineService().list(query.page, query.per_page)

        return disciplines
    }

    @Get(':id')
    public async getOne(@Param('id') id: string): Promise<ApiResponse> {
        const discipline = await new DisciplineService().get(id)

        return { data: discipline }
    }

    @Post()
    @Validate({
        name: Yup.string().trim().min(3)
    })
    public async create(@Body() data: any, @UserFromSession() user: IUser): Promise<ApiResponse> {
        if (user.type != 'admin') { } // TODO permission

        return { data: await new DisciplineService().create(data) }
    }

    @Post(':id')
    @Validate({
        name: Yup.string().trim().min(3)
    })
    public async update(@Body() data: any, @Param('id') id: string, @UserFromSession() user: IUser): Promise<ApiResponse> {
        if (user.type != 'admin') { } // TODO permission

        return { data: await new DisciplineService().update(id, data) }
    }

    @Delete(':id')
    public async delete(@Param('id') id: string, @UserFromSession() user: IUser): Promise<ApiResponse> {
        if (user.type != 'admin') { } // TODO permission

        return { data: await new DisciplineService().delete(id) }
    }

}