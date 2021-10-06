import { Class } from './Class'
import { BaseResourceService } from '../Base/BaseService'

export class ClassService extends BaseResourceService {
    constructor() { super(Class) }

    public async getPeopleFromClass(id: string) {
        const result = await Class.findById(id)
            .select('id teacher students name')
            .populate('teacher', 'id name')
            .populate('students', 'id name')
            .lean(true)
            .exec()

        return result
    }
}

export const classService = new ClassService()
