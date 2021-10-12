import { BaseResourceService } from '../Base/BaseService'
import { User } from '../System/User/User'
import { Class } from './Class'

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

    public async getClassesFromUser(userId: string) {
        const user = await User.findById(userId)
            .populate({
                path: 'classes',
                select: '_id name code teacher',
                populate: {
                    path: 'teacher',
                    select: '_id name'
                }
            })
            .lean()
            .exec()

        return user.classes
    }
}

export const classService = new ClassService()
