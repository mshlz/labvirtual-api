import { BadRequestError } from '../../utils/http/responses'
import { BaseResourceService } from '../Base/BaseService'
import { classService } from '../Class/ClassService'
import { classworkQuestionService } from '../ClassworkQuestion/ClassworkQuestionService'
import { classworkSubmissionService } from '../ClassworkSubmission/ClassworkSubmissionService'
import { IUser } from '../User/User'
import { Classwork, IClasswork } from './Classwork'

interface Q {
    questionId: string
    value: number
}
interface AdditionalData {
    classId?: string
    topicId?: string
    newQuestions?: Q[]
    questions?: Q[]
}
export class ClassworkService extends BaseResourceService<IClasswork> {
    constructor() { super(Classwork) }

    public async create(data: Partial<IClasswork & AdditionalData>) {
        const classwork = await super.create({
            ...data,
            class: data.classId,
            topic: data.topicId,
        })

        classwork.questions = await this.cloneNewQuestions(data.newQuestions, classwork._id)

        return classwork
    }

    public async update(id: string, data: IClasswork & AdditionalData) {
        await classworkQuestionService.syncClassworkQuestions(id, (data.questions || []).map(v => v.questionId))
        await this.cloneNewQuestions(data.newQuestions, id)
        return await super.update(id, { ...data, topic: data.topicId })
    }

    public async publishActivity(id: string) {
        const classwork = await Classwork.findById(id)

        if (!classwork) {
            throw new BadRequestError('Classwork not found')
        }

        if (classwork.status === 'PUBLISHED') {
            throw new BadRequestError('Classwork already published')
        }

        const students = await classService.getStudentsFromClass(classwork.class as string)
        await classworkSubmissionService.assignClassworkToStudents(classwork, students)

        classwork.status = 'PUBLISHED'
        await classwork.save()

        return true
    }

    public async getFromClassId(classId: string, user: IUser) {
        if (user.type === 'STUDENT') {
            return classworkSubmissionService.getSubmissionsFromStudentIdAndClassId(user._id, classId)
        }

        return Classwork.find({ class: classId })
            .lean(true)
    }

    public async get(id: string) {
        return Classwork.findById(id)
            .populate('author', 'id name')
            .populate('questions', 'id parent value name text type alternatives -classwork')
            .lean(true)
    }

    private async cloneNewQuestions(questions: { questionId: string, value: number }[], classworkId: string) {
        const clonedQuestions = []

        for await (const { questionId, value } of (questions || [])) {
            const clonedQuestion = await classworkQuestionService.clone(questionId, classworkId, value)
            // dont return repeated question
            if (!clonedQuestions.some(v => v._id == (clonedQuestion as any)._id))
                clonedQuestions.push(clonedQuestion)
        }

        return clonedQuestions
    }
}

export const classworkService = new ClassworkService()
