import { Body, Delete, Get, JsonController, Param, Post, QueryParams } from 'routing-controllers'
import { ApiResponse } from '../../interfaces/ApiResponse'
import { UserFromSession } from '../../utils/decorators/UserFromSession'
import { success } from '../../utils/http/responses'
import { Validate } from '../../utils/validator/Validator'
import { IUser } from '../System/User/User'
import { commentService } from './CommentService'
import rules from './validation/rules'

@JsonController('/comments/')
export class CommentController {
    @Get()
    public async list(@QueryParams() query): Promise<ApiResponse> {
        const posts = await commentService.list(query.page, query.per_page)
        return posts
    }

    @Get(':id')
    public async getOne(@Param('id') id: string): Promise<ApiResponse> {
        return success(await commentService.get(id))
    }

    @Post()
    @Validate(rules.onCreate)
    public async create(@Body() data: any, @UserFromSession() user: IUser): Promise<ApiResponse> {
        return success(await commentService.create({ text: data.text, post: data.postId, author: user._id }))
    }

    @Post(':id')
    @Validate(rules.onUpdate)
    public async update(@Body() data: any, @Param('id') id: string): Promise<ApiResponse> {
        return success(await commentService.update(id, data))
    }

    @Delete(':id')
    public async delete(@Param('id') id: string): Promise<ApiResponse> {
        return success(await commentService.delete(id))
    }

}