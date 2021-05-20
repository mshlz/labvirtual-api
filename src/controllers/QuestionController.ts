import { Body, Delete, Get, JsonController, Param, Post } from "routing-controllers";
import { ApiResponse } from "../interfaces/ApiResponse";
import { IUser } from "../models/User";
import { QuestionService } from "../services/QuestionService";
import { UserFromSession } from "../utils/decorators/UserFromSession";
import { Validate, Yup } from "../utils/validator/Validator";

@JsonController('/questions/')
export class QuestionController {
    @Get()
    public async list(): Promise<ApiResponse> {
        const quesitons = await QuestionService.list()

        return { data: quesitons }
    }

    @Get(':id')
    public async getOne(@Param('id') id: string): Promise<ApiResponse> {
        const question = await QuestionService.get(id)

        return { data: question }
    }

    @Post()
    @Validate({
        name: Yup.string().trim().min(3),
        text: Yup.string().trim(),
        type: Yup.string().trim().oneOf(['dissertative', 'single-choice', 'multiple-choice']),
        alternatives: Yup.array(),
    })
    public async create(@Body() data: any, @UserFromSession() user: IUser): Promise<ApiResponse> {
        if (user.type != 'admin') { } // TODO permission

        return { data: await QuestionService.create(data) }
    }

    @Post(':id')
    @Validate({
        name: Yup.string().trim().min(3),
        text: Yup.string().trim(),
        type: Yup.string().trim().oneOf(['dissertative', 'single-choice', 'multiple-choice']),
        alternatives: Yup.array(),
    })
    public async update(@Body() data: any, @Param('id') id: string, @UserFromSession() user: IUser): Promise<ApiResponse> {
        if (user.type != 'admin') { } // TODO permission

        return { data: await QuestionService.update(id, data) }
    }

    @Delete(':id')
    public async delete(@Param('id') id: string, @UserFromSession() user: IUser): Promise<ApiResponse> {
        if (user.type != 'admin') { } // TODO permission

        return { data: await QuestionService.delete(id) }
    }

}