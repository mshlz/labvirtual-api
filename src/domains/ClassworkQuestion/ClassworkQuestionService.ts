import { BaseResourceService } from '../Base/BaseService'
import { questionService } from '../Question/QuestionService'
import { ClassworkQuestion } from './ClassworkQuestion'

export class ClassworkQuestionService extends BaseResourceService {
    constructor() { super(ClassworkQuestion) }

    public async clone(questionId: string, classworkId: string, value: number) {
        const original = await questionService.get(questionId)

        const question = new ClassworkQuestion({
            parent: original._id,
            name: original.name,
            text: original.text,
            type: original.type,
            alternatives: original.alternatives,
            classwork: classworkId,
            value
        })

        return question.save()
    }

}

export const classworkQuestionService = new ClassworkQuestionService()
