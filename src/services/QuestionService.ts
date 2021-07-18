import { Question } from "../models/Question"
import { BaseResourceService } from "./_BaseService"

export class QuestionService extends BaseResourceService {
    constructor() { super(Question) }

    public async list(page?: number, per_page?: number) {
        return super.list(page, per_page, { populate: [{ path: 'discipline', select: 'name id' }, { path: 'subject', select: 'name id' }] })
    }
}
