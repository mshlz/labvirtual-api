import { Body, Delete, Get, JsonController, Param, Params, Post, QueryParams } from 'routing-controllers'
import { ApiResponse } from '../../interfaces/ApiResponse'
import { UserFromSession } from '../../utils/decorators/UserFromSession'
import { Validate } from '../../utils/validator/Validator'
import { IUser } from '../System/User/User'
import { postService } from './PostService'
import rules from './validation/rules'

@JsonController('/posts/')
export class PostController {
    @Get()
    public async list(@QueryParams() query): Promise<ApiResponse> {
        const posts = await postService.list(query.page, query.per_page)

        return posts
    }

    @Get('class/:id')
    public async listFromClass(@Params() params): Promise<ApiResponse> {
        const posts = await postService.listFromClassUuid(params.id)

        return { data: posts }
    }

    @Get(':id')
    public async getOne(@Param('id') id: string): Promise<ApiResponse> {
        const post = await postService.get(id)

        return { data: post }
    }

    @Post()
    @Validate(rules.onCreate)
    public async create(@Body() data: any, @UserFromSession() user: IUser): Promise<ApiResponse> {
        

        return { data: await postService.create({ ...data, author: user._id, class: data.class_uuid }) }
    }

    @Post(':id')
    @Validate(rules.onUpdate)
    public async update(@Body() data: any, @Param('id') id: string): Promise<ApiResponse> {
        

        return { data: await postService.update(id, data) }
    }

    @Delete(':id')
    public async delete(@Param('id') id: string): Promise<ApiResponse> {
        

        return { data: await postService.delete(id) }
    }

}