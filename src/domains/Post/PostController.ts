import { Body, Delete, Get, JsonController, Param, Params, Post, QueryParams } from 'routing-controllers'
import { ApiResponse } from '../../interfaces/ApiResponse'
import { UserFromSession } from '../../utils/decorators/UserFromSession'
import { success } from '../../utils/http/responses'
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

    @Get('from/class')
    @Validate(rules.getFromClass)
    public async getFromClass(@Body() data): Promise<ApiResponse> {
        return success(await postService.getFromClass(data.classId))
    }

    @Get(':id')
    public async getOne(@Param('id') id: string): Promise<ApiResponse> {
        return success(await postService.get(id))
    }

    @Post()
    @Validate(rules.onCreate)
    public async create(@Body() data: any, @UserFromSession() user: IUser): Promise<ApiResponse> {
        return success(await postService.create({ ...data, author: user._id, class: data.classId }))
    }

    @Post(':id')
    @Validate(rules.onUpdate)
    public async update(@Body() data: any, @Param('id') id: string): Promise<ApiResponse> {
        return success(await postService.update(id, data))
    }

    @Delete(':id')
    public async delete(@Param('id') id: string): Promise<ApiResponse> {
        return success(await postService.delete(id))
    }

}