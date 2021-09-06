import { Body, Delete, Get, JsonController, Param, Post, QueryParams } from "routing-controllers";
import { ApiResponse } from "../../interfaces/ApiResponse";
import { IUser } from "../System/User/User";
import { ClassTopicService } from "./ClassTopicService";
import { UserFromSession } from "../../utils/decorators/UserFromSession";
import { Validate, Yup } from "../../utils/validator/Validator";

@JsonController('/class-topics/')
export class ClassTopicController {
    @Get()
    public async list(@QueryParams() query): Promise<ApiResponse> {
        const topics = await new ClassTopicService().list(query.page, query.per_page)

        return topics
    }

    @Get('by-class/:id')
    public async getByClassId(@Param('id') id: string): Promise<ApiResponse> {
        const topic = await new ClassTopicService().getByClassId(id)

        return { data: topic }
    }

    @Get(':id')
    public async getOne(@Param('id') id: string): Promise<ApiResponse> {
        const topic = await new ClassTopicService().get(id)

        return { data: topic }
    }

    @Post()
    @Validate({
        name: Yup.string().trim().min(3),
        class: Yup.string().trim().required().uuid()
    })
    public async create(@Body() data: any, @UserFromSession() user: IUser): Promise<ApiResponse> {
        if (user.type != 'admin') { } // TODO permission

        return { data: await new ClassTopicService().create(data) }
    }

    @Post(':id')
    @Validate({
        name: Yup.string().trim().min(3)
    })
    public async update(@Body() data: any, @Param('id') id: string, @UserFromSession() user: IUser): Promise<ApiResponse> {
        if (user.type != 'admin') { } // TODO permission

        return { data: await new ClassTopicService().update(id, data) }
    }

    @Delete(':id')
    public async delete(@Param('id') id: string, @UserFromSession() user: IUser): Promise<ApiResponse> {
        if (user.type != 'admin') { } // TODO permission

        return { data: await new ClassTopicService().delete(id) }
    }

}