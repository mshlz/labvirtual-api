import { Body, Delete, Get, JsonController, Param, Post, QueryParams } from 'routing-controllers'
import { ApiResponse } from '../../interfaces/ApiResponse'
import { UserFromSession } from '../../utils/decorators/UserFromSession'
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
        const post = await commentService.get(id)

        return { data: post }
    }

    @Post()
    @Validate(rules.onCreate)
    public async create(@Body() data: any, @UserFromSession() user: IUser): Promise<ApiResponse> {
        

        return { data: await commentService.create({ ...data, author: user._id }) }
    }

    @Post(':id')
    @Validate(rules.onUpdate)
    public async update(@Body() data: any, @Param('id') id: string): Promise<ApiResponse> {
        

        return { data: await commentService.update(id, data) }
    }

    @Delete(':id')
    public async delete(@Param('id') id: string): Promise<ApiResponse> {
        

        return { data: await commentService.delete(id) }
    }

}