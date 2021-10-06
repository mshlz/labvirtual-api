import { IQuestion, Question } from './Question'
import { BaseResourceService } from '../Base/BaseService'
import { Model } from 'mongoose'

export class QuestionService extends BaseResourceService {
    constructor() { super(Question) }

    public async list(page?: number, per_page?: number) {
        return super.list(page, per_page, { populate: [{ path: 'disciplines', select: 'name id' }, { path: 'subjects', select: 'name id' }] })
    }

    public async simpleSearch(query: string) {
        const model = this.model as Model<IQuestion>

        return model.find({
            $or: [
                { name: { $regex: `/${query}/i` }},
                { text: { $regex: `/${query}/i` }},
            ]
        }).lean(true).exec()
    }
}

export const questionService = new QuestionService()
