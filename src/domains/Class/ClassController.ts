import { Body, Delete, Get, JsonController, Param, Post, QueryParams } from "routing-controllers";
import { ApiResponse } from "../../interfaces/ApiResponse";
import { UserFromSession } from "../../utils/decorators/UserFromSession";
import { Validate } from "../../utils/validator/Validator";
import { IUser } from "../System/User/User";
import { ClassService } from "./ClassService";
import rules from "./validation/rules";

@JsonController('/classes/')
export class ClassController {
    @Get()
    public async list(@QueryParams() query): Promise<ApiResponse> {
        const classes = await new ClassService().list(query.page, query.per_page)

        return classes
    }

    @Get(':id')
    public async getOne(@Param('id') id: string): Promise<ApiResponse> {
        const classe = await new ClassService().get(id)

        return { data: classe }
    }

    @Get(':id/people')
    public async getPeople(@Param('id') id: string): Promise<ApiResponse> {
        const classe = await new ClassService().getPeopleFromClass(id)

        return { data: classe }
    }

    @Post()
    @Validate(rules.onCreate)
    public async create(@Body() data: any, @UserFromSession() user: IUser): Promise<ApiResponse> {
        if (user.type != 'admin') { } // TODO permission

        return { data: await new ClassService().create(data) }
    }

    @Post(':id')
    @Validate(rules.onUpdate)
    public async update(@Body() data: any, @Param('id') id: string, @UserFromSession() user: IUser): Promise<ApiResponse> {
        if (user.type != 'admin') { } // TODO permission

        return { data: await new ClassService().update(id, data) }
    }

    @Delete(':id')
    public async delete(@Param('id') id: string, @UserFromSession() user: IUser): Promise<ApiResponse> {
        if (user.type != 'admin') { } // TODO permission

        return { data: await new ClassService().delete(id) }
    }

}