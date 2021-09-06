import { Body, Delete, Get, JsonController, Param, Post, QueryParams } from "routing-controllers";
import { ApiResponse } from "../../interfaces/ApiResponse";
import { UserFromSession } from "../../utils/decorators/UserFromSession";
import { Validate } from "../../utils/validator/Validator";
import { IUser } from "../System/User/User";
import { QuizService } from "./QuizService";
import rules from "./validation/rules";

@JsonController('/quiz/')
export class QuizController {
    @Get()
    public async list(@QueryParams() query): Promise<ApiResponse> {
        const quizzes = await new QuizService().list(query.page, query.per_page)

        return quizzes
    }

    @Get(':id')
    public async getOne(@Param('id') id: string): Promise<ApiResponse> {
        const quiz = await new QuizService().get(id)

        return { data: quiz }
    }

    @Post()
    @Validate(rules.onCreate)
    public async create(@Body() data: any, @UserFromSession() user: IUser): Promise<ApiResponse> {
        if (user.type != 'admin') { } // TODO permission

        return { data: await new QuizService().create({...data, questions: data.ref_questions || []}) }
    }

    @Post(':id')
    @Validate(rules.onUpdate)
    public async update(@Body() data: any, @Param('id') id: string, @UserFromSession() user: IUser): Promise<ApiResponse> {
        if (user.type != 'admin') { } // TODO permission

        return { data: await new QuizService().update(id, data) }
    }

    @Delete(':id')
    public async delete(@Param('id') id: string, @UserFromSession() user: IUser): Promise<ApiResponse> {
        if (user.type != 'admin') { } // TODO permission

        return { data: await new QuizService().delete(id) }
    }

}