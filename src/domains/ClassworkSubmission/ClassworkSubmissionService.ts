import { ClassworkSubmission, IQuestionAnswer } from './ClassworkSubmission'
import { BaseResourceService } from '../Base/BaseService'
import { IClasswork } from '../Classwork/Classwork'
import { IUser } from '../User/User'
import { BadRequestError } from '../../utils/http/responses'
import { classworkQuestionService } from '../ClassworkQuestion/ClassworkQuestionService'

export class ClassworkSubmissionService extends BaseResourceService {
    constructor() { super(ClassworkSubmission) }

    public async assignClassworkToStudents(classwork: IClasswork, students: IUser[]) {
        const classworkItems = students.map(student => new ClassworkSubmission({
            class: classwork.class,
            classwork: classwork._id,
            student: student._id
        }))

        return await ClassworkSubmission.create(classworkItems)
    }

    public async getSubmissionsFromStudentIdAndClassId(userId: string, classId: string) {
        return ClassworkSubmission.find({ student: userId, class: classId })
            .select('-answers -student')
            .populate({ path: 'classwork', populate: { path: 'author', select: 'name' } })
            .lean(true)
    }

    public async getAssignment(assignmentId: string) {
        const workSubmission = await ClassworkSubmission.findOne({ _id: assignmentId })
            .populate({ path: 'classwork', populate: { path: 'author', select: 'name' } })
            .lean(true)

        if (!workSubmission) {
            throw new BadRequestError('No classwork assigned')
        }

        return workSubmission

    }

    public async submitClasswork(classworkId: string, answers: Partial<IQuestionAnswer>[], userId: string) {
        const workSubmission = await ClassworkSubmission.findOne({ classwork: classworkId, student: userId })

        if (!workSubmission) {
            throw new BadRequestError('No classwork assigned')
        }

        if (workSubmission.status !== 'NEW') {
            throw new BadRequestError('You already submitted this classwork')
        }

        const activityQuestions = await classworkQuestionService.getQuestionsFromClassworkId(classworkId)

        if (!answers || answers.length !== activityQuestions.length) {
            throw new BadRequestError('Missing answers')
        }

        const finalAnswers: IQuestionAnswer[] = []

        for (const question of activityQuestions) {
            const answer = answers.find(v => v.question == question._id) as IQuestionAnswer

            if (!answer) {
                throw new BadRequestError(`Missing answer for question "${question._id}"`)
            }

            if (question.type === 'DISSERTATIVE') {
                continue
            }
            else if (question.type === 'SINGLE_CHOICE') {
                const correctAlternative = question.alternatives.find(v => v.correct)

                answer.correct = answer.answer === correctAlternative.code
                answer.grade = answer.correct ? question.value : 0
            }
            else if (question.type === 'MULTIPLE_CHOICE') {
                const correctAlternatives = question.alternatives.filter(v => v.correct)
                const correctCount = (answer.answer as string[]).reduce((count, code) => {
                    if (correctAlternatives.some(c => c.code === code)) {
                        return count + 1
                    } else {
                        return count
                    }
                }, 0)

                const gradeFactor = correctCount / correctAlternatives.length
                const grade = question.value * gradeFactor  // optimistic (no deduction on wrong options checked)

                answer.correct = grade > 0
                answer.grade = grade
            }
            else {
                throw new BadRequestError(`Invalid question type "${question.type}"`)
            }

            finalAnswers.push(answer)
        }

        // if has no dissertative question then calculate the grade
        if (!activityQuestions.some(question => question.type === 'DISSERTATIVE')) {
            workSubmission.grade = finalAnswers.reduce((sum, ans) => sum + ans.grade, 0)
        }

        workSubmission.status = 'SUBMITTED'
        workSubmission.answers = finalAnswers
        workSubmission.submittedAt = new Date()

        await workSubmission.save()

        return true
    }
}

export const classworkSubmissionService = new ClassworkSubmissionService()
