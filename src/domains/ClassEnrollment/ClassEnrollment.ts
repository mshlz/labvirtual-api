import { model } from 'mongoose'
import { BaseSchema } from '../Base/BaseSchema'
import { IClass } from '../Class/Class'
import mongoosePaginator from '../../utils/database/mongoose-paginator'
import { IUser } from '../System/User/User'

interface IClassEnrollment {
    student: IUser | string
    class: IClass | string
}

const ClassEnrollmentSchema = new BaseSchema<IClassEnrollment>({
    student: { type: String, ref: 'User' },
    class: { type: String, ref: 'Class' },
}, { versionKey: false, timestamps: true })

ClassEnrollmentSchema.plugin(mongoosePaginator)

const ClassEnrollment = model<IClassEnrollment>('ClassEnrollment', ClassEnrollmentSchema)

export { ClassEnrollment, IClassEnrollment }

