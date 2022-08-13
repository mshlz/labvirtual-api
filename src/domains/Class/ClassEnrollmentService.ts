import { BadRequestError } from 'routing-controllers'
import { Class } from './Class'
import { User } from '../User/User'

export class ClassEnrollmentService {

    public async enrollUser(userId: string, classId: string) {
        try {
            await User.updateOne({ _id: userId }, {
                $addToSet: {
                    classes: classId
                }
            })

            await Class.updateOne({ _id: classId }, {
                $addToSet: {
                    students: userId
                }
            })
        } catch (e) {
            throw new BadRequestError('Failed to enroll')
        }

        return true
    }

    public async unenrollUser(userId: string, classId: string) {
        try {
            await User.updateOne({ _id: userId }, {
                $pull: {
                    classes: classId
                }
            })

            await Class.updateOne({ _id: classId }, {
                $pull: {
                    students: userId
                }
            })
        } catch (e) {
            throw new BadRequestError('Failed to unenroll')
        }

        return true
    }
}

export const classEnrollmentService = new ClassEnrollmentService()
