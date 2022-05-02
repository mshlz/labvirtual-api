import { Body, Delete, Get, JsonController, Param, Post, QueryParams } from 'routing-controllers'
import { ApiResponse } from '../../interfaces/ApiResponse'
import { UserFromSession } from '../../utils/decorators/UserFromSession'
import { success } from '../../utils/http/responses'
import { Validate } from '../../utils/validator/Validator'
import { IUser } from '../System/User/User'
import { IQuestionAnswer } from './ClassworkSubmission'
import { classworkSubmissionService } from './ClassworkSubmissionService'
import rules from './validation/rules'

@JsonController('/classwork-actions/') // bad name
export class ClassworkSubmissionController {
    @Post('submit')
    @Validate(rules.onSubmitClasswork)
    async submit(@Body() body: any, @UserFromSession() user: IUser) {
        const answers: Partial<IQuestionAnswer>[] = body.answers.map(v => ({
            question: v.questionId,
            answer: v.answer
        }))
        return success(await classworkSubmissionService.submitClasswork(body.classworkId, answers, user._id))
    }
}