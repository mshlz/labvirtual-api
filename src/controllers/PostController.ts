import { Body, Delete, Get, JsonController, Param, Post, QueryParams } from "routing-controllers";
import { ApiResponse } from "../interfaces/ApiResponse";
import { IUser } from "../models/User";
import { PostService } from "../services/PostService";
import { UserFromSession } from "../utils/decorators/UserFromSession";
import { Validate, Yup } from "../utils/validator/Validator";

@JsonController('/posts/')
export class PostController {
    @Get()
    public async list(@QueryParams() query): Promise<ApiResponse> {
        const posts = await new PostService().list(query.page, query.per_page)

        return posts
    }

    @Get(':id')
    public async getOne(@Param('id') id: string): Promise<ApiResponse> {
        const post = await new PostService().get(id)

        return { data: post }
    }

    @Post()
    @Validate({
        text: Yup.string().trim().min(3).max(5000)
    })
    public async create(@Body() data: any, @UserFromSession() user: IUser): Promise<ApiResponse> {
        if (user.type != 'admin') { } // TODO permission

        return { data: await new PostService().create(data) }
    }

    @Post(':id')
    @Validate({
        name: Yup.string().trim().min(3)
    })
    public async update(@Body() data: any, @Param('id') id: string, @UserFromSession() user: IUser): Promise<ApiResponse> {
        if (user.type != 'admin') { } // TODO permission

        return { data: await new PostService().update(id, data) }
    }

    @Delete(':id')
    public async delete(@Param('id') id: string, @UserFromSession() user: IUser): Promise<ApiResponse> {
        if (user.type != 'admin') { } // TODO permission

        return { data: await new PostService().delete(id) }
    }

}