import { BaseResourceService } from '../Base/BaseService'
import { User } from '../System/User/User'
import { Class, IClass } from './Class'

export class ClassService extends BaseResourceService {
    constructor() { super(Class) }

    public async getPeopleFromClass(classId: string) {
        const result = await Class.findById(classId)
            .select('id teacher students name')
            .populate('teacher', 'id name')
            .populate('students', 'id name')
            .lean(true)
            .exec()

        return result
    }
    
    public async getStudentsFromClass(classId: string) {
        const result = await Class.findById(classId)
            .select('id students')
            .populate('students', 'id name')
            .lean(true)
            .exec()

        return result.students
    }

    public async getClassesFromUserId(userId: string) {
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

        return user.classes as IClass[]
    }
}

export const classService = new ClassService()
