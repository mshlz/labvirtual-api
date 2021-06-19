import { Question } from "../models/Question"
import { BaseResourceService } from "./_BaseService"

export class QuestionService extends BaseResourceService {
    constructor() { super(Question) }
}
