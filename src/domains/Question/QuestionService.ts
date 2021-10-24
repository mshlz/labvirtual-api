import { escapeStringRegexp } from '../../utils/helpers'
import { BadRequestError } from '../../utils/http/responses'
import { BaseResourceService } from '../Base/BaseService'
import { IQuestion, Question } from './Question'


export class QuestionService extends BaseResourceService<IQuestion> {
    constructor() { super(Question) }

    public async list(page?: number, per_page?: number) {
        return super.list(page, per_page, { populate: [{ path: 'disciplines', select: 'name id' }, { path: 'subjects', select: 'name id' }] })
    }

    public async simpleSearch(query: string, skipIds: string[]) {
        const $regex = new RegExp(escapeStringRegexp(query), 'i')
        
        return this.model.find({
            _id: {
                $nin: skipIds
            },
            $or: [
                { name: { $regex } },
                { text: { $regex } },
            ]
        }).select('id name type text').limit(5).lean(true).exec()
    }

    validateAlternatives(question: IQuestion) {
        if (question.type == 'DISSERTATIVE' && question.alternatives?.length)
            throw new BadRequestError('Questões dissertativas não podem ter alternativas.')

        if ((question.type == 'SINGLE_CHOICE' || question.type == 'MULTIPLE_CHOICE') && question.alternatives?.length < 2)
            throw new BadRequestError('Questões de múltipla escolha precisam ter ao menos duas alternativas.')

        if (question.type == 'SINGLE_CHOICE' && question.alternatives?.reduce((count, current) => count += current.correct ? 1 : 0, 0) > 1)
            throw new BadRequestError('Questões de múltipla escolha (resposta única) só podem ter uma alternativa correta.')

        return true
    }
}

export const questionService = new QuestionService()
