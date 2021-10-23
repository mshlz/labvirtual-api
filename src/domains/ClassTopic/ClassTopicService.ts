import { ClassTopic } from './ClassTopic'
import { BaseResourceService } from '../Base/BaseService'

export class ClassTopicService extends BaseResourceService {
    constructor() { super(ClassTopic) }

    public async getFromClasses(classes: string[]) {
        return ClassTopic.find({ class: { $in: classes } }).lean(true).exec()
    }
}

export const classTopicService = new ClassTopicService()
