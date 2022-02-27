import { ClassworkSubmission } from './ClassworkSubmission'
import { BaseResourceService } from '../Base/BaseService'
import { IClasswork } from '../Classwork/Classwork'
import { IUser } from '../System/User/User'

export class ClassworkSubmissionService extends BaseResourceService {
    constructor() { super(ClassworkSubmission) }

    public async assignClassworkToStudents(classwork: IClasswork, students: IUser[]) {
        const classworkItems = students.map(student => new ClassworkSubmission({
            class: classwork.class,
            classwork: classwork._id,
            student: student._id
        }))

        return await ClassworkSubmission.create(classworkItems)
    }
}

export const classworkSubmissionService = new ClassworkSubmissionService()
