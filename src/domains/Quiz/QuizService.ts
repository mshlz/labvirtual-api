import { Quiz } from './Quiz'
import { BaseResourceService } from '../Base/BaseService'

export class QuizService extends BaseResourceService {
    constructor() { super(Quiz) }

    public async list(page?: number, per_page?: number): Promise<any> {
        return super.list(page, per_page, { populate: [{ path: 'discipline', select: 'name id'}, { path: 'subject', select: 'name id'}] })
    }

    public async get(id): Promise<any> {
        const result = await Quiz.findById(id).populate('discipline', 'id name').populate('subject', 'id name')
        return result?.toJSON()
    }

}
