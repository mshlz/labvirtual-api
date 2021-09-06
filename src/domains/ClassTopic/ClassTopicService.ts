import { ClassTopic } from './ClassTopic'
import { BaseResourceService } from '../Base/BaseService'

export class ClassTopicService extends BaseResourceService {
    constructor() { super(ClassTopic) }

    public async getByClassId(id: string) {
        const topics = await ClassTopic.find({ class: id }).lean(true).exec()
        return topics
    }
}
