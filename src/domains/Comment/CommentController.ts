import { Body, Delete, Get, JsonController, Param, Post, QueryParams } from "routing-controllers";
import { ApiResponse } from "../../interfaces/ApiResponse";
import { IUser } from "../System/User/User";
import { Post as PostModel } from "../Post/Post";
import { CommentService } from "./CommentService";
import { UserFromSession } from "../../utils/decorators/UserFromSession";
import { Validate, Yup } from "../../utils/validator/Validator";
import { Comment } from "./Comment";

@JsonController('/comments/')
export class CommentController {
    @Get()
    public async list(@QueryParams() query): Promise<ApiResponse> {
        const posts = await new CommentService().list(query.page, query.per_page)

        return posts
    }

    @Get(':id')
    public async getOne(@Param('id') id: string): Promise<ApiResponse> {
        const post = await new CommentService().get(id)

        return { data: post }
    }

    @Post()
    @Validate({
        text: Yup.string().trim().min(3).max(1000).required(),
        post_uuid: Yup.string().uuid().required()
    })
    public async create(@Body() data: any, @UserFromSession() user: IUser): Promise<ApiResponse> {
        if (user.type != 'admin') { } // TODO permission

        return { data: await new CommentService().create({ ...data, author: user._id }) }
    }

    @Post(':id')
    @Validate({
        name: Yup.string().trim().min(3)
    })
    public async update(@Body() data: any, @Param('id') id: string, @UserFromSession() user: IUser): Promise<ApiResponse> {
        if (user.type != 'admin') { } // TODO permission

        return { data: await new CommentService().update(id, data) }
    }

    @Delete(':id')
    public async delete(@Param('id') id: string, @UserFromSession() user: IUser): Promise<ApiResponse> {
        if (user.type != 'admin') { } // TODO permission

        return { data: await new CommentService().delete(id) }
    }

}