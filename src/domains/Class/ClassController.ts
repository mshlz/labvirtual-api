import { Body, Delete, Get, JsonController, NotFoundError, Param, Post, QueryParams } from 'routing-controllers'
import { ApiResponse } from '../../interfaces/ApiResponse'
import { UserFromSession } from '../../utils/decorators/UserFromSession'
import { Validate } from '../../utils/validator/Validator'
import { IUser } from '../System/User/User'
import { Class } from './Class'
import { classEnrollmentService } from './ClassEnrollmentService'
import { classService } from './ClassService'
import rules from './validation/rules'

@JsonController('/classes/')
export class ClassController {
    @Get()
    public async list(@QueryParams() query): Promise<ApiResponse> {
        const classes = await classService.list(query.page, query.per_page)

        return classes
    }

    @Get('my-classes')
    public async myClasses(@UserFromSession() user: IUser): Promise<ApiResponse> {
        console.log(user)
        const classes = await classService.getClassesFromUser(user._id)

        return { data: classes }
    }

    @Get(':id')
    public async getOne(@Param('id') id: string): Promise<ApiResponse> {
        const classe = await classService.get(id)

        return { data: classe }
    }

    @Get(':id/people')
    public async getPeople(@Param('id') id: string): Promise<ApiResponse> {
        const classe = await classService.getPeopleFromClass(id)

        return { data: classe }
    }

    @Post()
    @Validate(rules.onCreate)
    public async create(@Body() data: any): Promise<ApiResponse> {

        return { data: await classService.create(data) }
    }

    @Post('enroll')
    @Validate(rules.onEnroll)
    public async enroll(@Body() data: any, @UserFromSession() user): Promise<ApiResponse> {
        const klass = await Class.findOne({ code: data.code }).select('_id name').exec()

        if (!klass) {
            throw new NotFoundError('Class not found')
        }

        await classEnrollmentService.enrollUser(user._id, klass._id)

        return { data: klass.toObject() }
    }

    @Post('unenroll')
    @Validate(rules.onUnenroll)
    public async unenroll(@Body() data: any, @UserFromSession() user): Promise<ApiResponse> {
        return { data: await classEnrollmentService.unenrollUser(user._id, data.classId) }
    }

    @Post(':id')
    @Validate(rules.onUpdate)
    public async update(@Body() data: any, @Param('id') id: string): Promise<ApiResponse> {

        return { data: await classService.update(id, data) }
    }

    @Delete(':id')
    public async delete(@Param('id') id: string): Promise<ApiResponse> {

        return { data: await classService.delete(id) }
    }

}