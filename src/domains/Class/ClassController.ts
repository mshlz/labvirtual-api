import { Body, Delete, Get, JsonController, NotFoundError, Param, Post, QueryParams } from 'routing-controllers'
import { ApiResponse } from '../../interfaces/ApiResponse'
import { Authorized } from '../../utils/auth'
import { UserFromSession } from '../../utils/decorators/UserFromSession'
import { success } from '../../utils/http/responses'
import { Validate } from '../../utils/validator/Validator'
import { IUser } from '../System/User/User'
import { Class } from './Class'
import { classEnrollmentService } from './ClassEnrollmentService'
import { classService } from './ClassService'
import rules from './validation/rules'

@JsonController('/classes/')
@Authorized()
export class ClassController {
    @Get()
    public async list(@QueryParams() query): Promise<ApiResponse> {
        const classes = await classService.list(query.page, query.per_page)

        return classes
    }

    @Get('my-classes')
    public async myClasses(@UserFromSession() user: IUser): Promise<ApiResponse> {
        return success(await classService.getClassesFromUserId(user._id))
    }

    @Get(':id')
    public async getOne(@Param('id') id: string): Promise<ApiResponse> {
        return success(await classService.get(id))
    }

    @Get(':id/people')
    public async getPeople(@Param('id') id: string): Promise<ApiResponse> {
        return success(await classService.getPeopleFromClass(id))
    }

    @Post()
    @Validate(rules.onCreate)
    public async create(@Body() data: any): Promise<ApiResponse> {
        return success(await classService.create(data))
    }

    @Post('enroll')
    @Validate(rules.onEnroll)
    public async enroll(@Body() data: any, @UserFromSession() user): Promise<ApiResponse> {
        const klass = await Class.findOne({ code: data.code }).select('_id name').exec()

        if (!klass) {
            throw new NotFoundError('Turma não encontrada')
        }

        await classEnrollmentService.enrollUser(user._id, klass._id)

        return success(klass.toObject())
    }

    @Post('unenroll')
    @Validate(rules.onUnenroll)
    public async unenroll(@Body() data: any, @UserFromSession() user): Promise<ApiResponse> {
        return success(await classEnrollmentService.unenrollUser(user._id, data.classId))
    }

    @Post(':id')
    @Validate(rules.onUpdate)
    public async update(@Body() data: any, @Param('id') id: string): Promise<ApiResponse> {
        return success(await classService.update(id, data))
    }

    @Delete(':id')
    public async delete(@Param('id') id: string): Promise<ApiResponse> {
        return success(await classService.delete(id))
    }

}