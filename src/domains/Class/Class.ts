import { model } from 'mongoose'
import { BaseSchema } from '../Base/BaseSchema'
import { IDiscipline } from '../Discipline/Discipline'
import mongoosePaginator from '../../utils/database/mongoose-paginator'
import { IUser } from '../User/User'
import { getNanoId } from '../../utils/nanoid'

export interface IClass {
    name: string
    description: string
    code: string
    teacher: string | IUser
    discipline: string | IDiscipline
    students: IUser[]
}

const ClassSchema = new BaseSchema<IClass>({
    name: String,
    description: String,
    code: { type: String, default: () => getNanoId(), immutable: true },
    teacher: { type: String, ref: 'User' },
    discipline: { type: String, ref: 'Discipline' },
    students: [{ type: String, ref: 'User', select: false }]
}, { versionKey: false, timestamps: true })

ClassSchema.plugin(mongoosePaginator)

export const Class = model<IClass>('Class', ClassSchema)
