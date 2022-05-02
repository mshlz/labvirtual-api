import { BaseResourceService } from '../Base/BaseService'
import { questionService } from '../Question/QuestionService'
import { ClassworkQuestion } from './ClassworkQuestion'

export class ClassworkQuestionService extends BaseResourceService {
    constructor() { super(ClassworkQuestion) }

    public async clone(questionId: string, classworkId: string, value: number) {
        const original = await questionService.get(questionId)

        const question = ClassworkQuestion.findOneAndUpdate({
            parent: original._id,
            classwork: classworkId
        }, {
            parent: original._id,
            name: original.name,
            text: original.text,
            type: original.type,
            alternatives: original.alternatives,
            classwork: classworkId,
            value
        }, {
            upsert: true,
            lean: true,
            new: true
        })

        return question
    }

    public async getQuestionsFromClassworkId(classworkId: string) {
        return ClassworkQuestion.find({ classwork: classworkId })
    }

    public async syncClassworkQuestions(classworkId: string, questionIds: string[]) {
        if (!questionIds) return

        const currentQuestions = await ClassworkQuestion.find({ classwork: classworkId }).select('_id')
        const shouldRemove = currentQuestions.filter(v => !questionIds.includes(v._id)).map(v => Promise.resolve(v.remove()))
        await Promise.all(shouldRemove)
    }

}

export const classworkQuestionService = new ClassworkQuestionService()
