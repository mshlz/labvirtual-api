import { escapeStringRegexp } from '../../utils/helpers'
import { BaseResourceService } from '../Base/BaseService'
import { Question } from './Question'


export class QuestionService extends BaseResourceService {
    constructor() { super(Question) }

    public async list(page?: number, per_page?: number) {
        return super.list(page, per_page, { populate: [{ path: 'disciplines', select: 'name id' }, { path: 'subjects', select: 'name id' }] })
    }

    public async simpleSearch(query: string) {
        const $regex = new RegExp(escapeStringRegexp(query), 'i')

        return this.model.find({
            $or: [
                { name: { $regex }},
                { text: { $regex }},
            ]
        }).select('id name type text').limit(5).lean(true).exec()
    }
}

export const questionService = new QuestionService()
